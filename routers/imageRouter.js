const express = require("express");
const router = express.Router();
const fs = require("fs");
const limiter = require("../middlewares/limiter");
const { generateImage } = require("../services/openai");
const { uploadImageToCloudinary } = require("../services/cloudinary");
const {
	saveImageToDB,
	getAllImages,
	updateImageVisibility,
} = require("../services/mongo");

router.post("/generate", limiter, async (req, res) => {
	try {
		const { prompt, name, email } = req.body;

		const imageData = await generateImage(prompt);
		const uniqueId = Date.now();
		const file = `./tmp/${uniqueId}.png`;

		await fs.writeFileSync(file, imageData, "base64");

		const url = await uploadImageToCloudinary(uniqueId, file);

		const savedImage = await saveImageToDB({
			uniqueId,
			url,
			prompt,
			isPrivate: false,
			uploadedBy: {
				name,
				email,
			},
		});
		setTimeout(async () => {
			fs.unlinkSync(file);
		}, 10000);

		return res.json({
			success: true,
			message: "Voila!",
			data: { ...savedImage },
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const images = await getAllImages();
		return res.json({
			success: true,
			message: "Voila!",
			data: [...images],
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

router.put("/", async (req, res) => {
	const { id, isPrivate } = req.body;
	console.log({ id, isPrivate });
	try {
		await updateImageVisibility(id, isPrivate);
		return res.json({
			success: true,
			message: "Image visiblity updated!",
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

module.exports = router;
