const limitCounter = require("../data/limitCounter.json");
const fs = require("fs");

module.exports = (req, res, next) => {
	const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	if (limitCounter[ip] && limitCounter[ip].count === 5) {
		const now = Date.now();
		const millis = now - limitCounter[ip].lastRequest;
		const diff = millis / 1000 / 60 / 60;
		if (diff < 24) {
			return res.json({
				success: false,
				message: `Your daily request limit is reached, you can request again after ${new Date(
					limitCounter[ip].lastRequest + 86400000
				)}`,
			});
		}
		delete limitCounter[ip];
	}

	if (limitCounter[ip]) {
		const { count } = limitCounter[ip];
		limitCounter[ip] = {
			count: count + 1,
			lastRequest: Date.now(),
		};
	} else {
		limitCounter[ip] = {
			count: 1,
			lastRequest: Date.now(),
		};
	}
	limitCounter[ip].lastRequest = Date.now();
	fs.writeFileSync("data/limitCounter.json", JSON.stringify(limitCounter));
	next();
};
