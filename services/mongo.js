const { Image } = require("../models/Image");

module.exports.saveImageToDB = async (imageData) => {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const image = new Image({
					...imageData,
				});
				await image.save();
				return resolve(image._doc);
			} catch (error) {
				return reject(error);
			}
		})();
	});
};

module.exports.getAllImages = async () => {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const images = await Image.find({ isPrivate: false });
				return resolve(images);
			} catch (error) {
				return reject(error);
			}
		})();
	});
};

module.exports.updateImageVisibility = async (id, isPrivate) => {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const { acknowledged } = await Image.updateOne(
					{ _id: id },
					{ isPrivate }
				);
				if (acknowledged) return resolve();
				return reject({ message: "Something went wrong" });
			} catch (error) {
				return reject(error);
			}
		})();
	});
};
