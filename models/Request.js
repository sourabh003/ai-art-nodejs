const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
	ip: { type: String, required: true },
	count: { type: Number, required: true },
	lastRequest: { type: Number, required: true },
});

exports.Request = mongoose.model("requests", requestSchema);
