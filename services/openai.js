const { Configuration, OpenAIApi } = require("openai");
const { OPEN_AI_API_SECRET_KEY } = require("../utils/constants");

const config = new Configuration({
	apiKey: OPEN_AI_API_SECRET_KEY,
});

const openai = new OpenAIApi(config);

module.exports.generateImage = async (prompt) => {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const aiResponse = await openai.createImage({
					prompt,
					n: 1,
					size: "512x512",
					response_format: "b64_json",
				});
				const url = aiResponse.data.data[0].url
				return resolve(url);
			} catch (error) {
				return reject(error);
			}
		})();
	});
};
