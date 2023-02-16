const mongoose = require("mongoose");
const { MONGO_URL } = require("../utils/constants");

module.exports = () => {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(MONGO_URL)
		.then(() => {
			console.log("Connected to database => " + MONGO_URL);
		})
		.catch((err) => {
			console.error("error => " + err.message);
		});
};
