const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
	uniqueId: { type: String, required: true },
	url: { type: String, required: true },
    data: { type: String, required: true },
    prompt: { type: String, required: true },
	uploadedBy: {
		name: { type: String, required: true },
		email: { type: String, required: false },
    },
    isPrivate: {type: Boolean, required: true}
});

exports.Image = mongoose.model("images", imageSchema);
