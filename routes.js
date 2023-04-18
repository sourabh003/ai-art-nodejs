const imageRouter = require("./routers/imageRouter");
const userRouter = require("./routers/userRouter");

module.exports = (app) => {
	app.get("/", (req, res) => {
		return res.send({ success: true, message: "Server running..." });
	});

	app.use("/api/images", imageRouter);
	app.use("/api/users", userRouter);
};
