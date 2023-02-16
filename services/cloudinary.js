const {
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
} = require("../utils/constants");

const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

module.exports.uploadImageToCloudinary = (id, imageURL) => {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				await cloudinary.uploader.upload(imageURL, {
					public_id: id,
					resource_type: "auto",
				});

				// Generate
				const url = cloudinary.url(id, {
					width: 512,
					height: 512,
					Crop: "fill",
				});

				return resolve(url);
			} catch (error) {
				return reject(error);
			}
		})();
	});
};
