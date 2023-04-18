const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
    ip: { type: String, required: true },
    email: { type: String, required: false },
	count: { type: Number, required: true },
	lastRequest: { type: Number, required: true },
});

exports.Request = mongoose.model("requests", requestSchema);
