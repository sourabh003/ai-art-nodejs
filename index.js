const express = require("express");
const app = express();

require("dotenv").config();
require("./startup/connect-db")();
require("./startup/startMiddlewares")(app);
require("./routes")(app);

(async () => {
	app.listen(process.env.PORT || 4000, () => {
		console.log("Server started...");
	});
})();
