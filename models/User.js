const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
	photo: { type: String, required: false },
});

exports.User = mongoose.model("users", userSchema);
