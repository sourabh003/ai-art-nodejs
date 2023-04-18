const { Image } = require("../models/Image");
const { User } = require("../models/User");

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
				const images = await Image.find(
					{ isPrivate: false },
					"_id uniqueId url prompt uploadedBy"
				);
				return resolve(images);
			} catch (error) {
				return reject(error);
			}
		})();
	});
};

module.exports.getUserImages = async (user) => {
	const { email } = user;
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const images = await Image.find(
					{ "uploadedBy.email": email }
				);
				return resolve(images);k
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

module.exports.getUserInfo = ({ photo, name, email }) => {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				let user = await User.findOne({ email });

				if (!user) {
					user = new User({ name, email, photo });
					await user.save();
				}
				const remainingRequests = await this.getUserRequestsCount(email);
				const photosCount = await this.getImagesCount(email);
				let userResponse = {
					...user._doc,
					remainingRequests,
					photosCount,
				};
				return resolve(userResponse);
			} catch (error) {
				return reject(error);
			}
		})();
	});
};

module.exports.getUserRequestsCount = (email) => {
	return 5;
};

module.exports.getImagesCount = (email) => {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				let imageCount = await Image.countDocuments({
					"uploadedBy.email": email,
				});
				return resolve(imageCount);
			} catch (error) {
				return reject(error);
			}
		})();
	});
};
