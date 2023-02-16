const imageRouter = require("./routers/imageRouter");

module.exports = (app) => {
	app.get("/", (req, res) => {
		return res.send({ success: true, message: "Server running..." });
	});

	app.use("/api/images", imageRouter);
};
