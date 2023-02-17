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
const imageData = require('../utils/dummy.json').data;

router.post("/generate", limiter, async (req, res) => {
	try {
		const { prompt, name, email } = req.body;

		// const imageData = await generateImage(prompt);
		const uniqueId = Date.now();

		const file = `tmp/${uniqueId}.png`;

		fs.writeFile(file, imageData, { encoding: "base64" }, function (error) {
			if (error) {
				return res.json({ success: false, message: error.message });
			}
			uploadImageToCloudinary(uniqueId, file)
				.then((url) => {
					saveImageToDB({
						uniqueId,
						url,
						prompt,
						isPrivate: false,
						uploadedBy: {
							name,
							email,
						},
					})
						.then((savedImage) => {
							fs.unlink(file, (err3) => {
                                if (err3) {
                                    console.log("Error3 => ", error)
									return res.json({ success: false, message: err3.message });
								}
								return res.json({
									success: true,
									message: "Voila!",
									data: { ...savedImage },
								});
							});
						})
                        .catch((err2) => {
                            console.log("Error2 => ", error)
							return res.json({ success: false, message: err2.message });
						});
				})
                .catch((err) => {
                    console.log("Err => ", error)
					return res.json({ success: false, message: err.message });
				});
		});
    } catch (error) {
        console.log("Error => ", error)
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
