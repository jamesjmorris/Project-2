console.log("controllers/tourney.js is running...");

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");
const Tourney  = require("../models/tourney");


router.get("/", (req, res) => {
	res.render("tourney/index.ejs", {
	})
});




module.exports = router;

