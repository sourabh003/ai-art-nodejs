const express = require('express')
const cors = require("cors");
const { ALLOWED_ORIGIN } = require("../utils/constants");

module.exports = (app) => {
	app.use(function (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, PATCH, DELETE"
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"X-Requested-With,content-type"
		);
		res.setHeader("Access-Control-Allow-Credentials", true);
		next();
	});
	app.use(
		cors({
			origin: ALLOWED_ORIGIN,
		})
	);
	app.use(express.json({ limit: "50mb" }));
};
