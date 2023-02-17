const fs = require("fs");
const { Request } = require("../models/Request");

module.exports = async (req, res, next) => {
	try {
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		const request = await Request.findOne({ ip });
		const newRequest = {
			ip,
			lastRequest: Date.now(),
		};

		if (request === null) {
			newRequest.count = 1;
			await new Request({ ...newRequest }).save();
		} else {
			const { count, lastRequest } = request;
			if (count < 5) {
				newRequest.count = count + 1;
			} else {
				const now = Date.now();
				const millis = now - lastRequest;
				const diff = millis / 1000 / 60 / 60;
				if (diff < 24) {
					return res.json({
						success: false,
						message: `Your daily request limit is reached, you can request again after ${new Date(
							lastRequest + 86400000
						)}`,
					});
				}
				newRequest.count = 1;
			}
			await Request.updateOne(
				{ ip },
				{ count: newRequest.count, lastRequest: newRequest.lastRequest }
			);
		}

		next();
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};
