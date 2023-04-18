const express = require("express");
const { User } = require("../models/User");
const { getUserInfo } = require("../services/mongo");
const router = express.Router();

router.post("/login", async (req, res) => {
	try {
		const user = await getUserInfo(req.body);

		return res.json({
			success: true,
			message: "Voila!",
			data: { ...user },
		});
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
			details: "Error",
		});
	}
});

module.exports = router;
