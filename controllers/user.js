console.log("controllers/slave.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");


// User Page Route
router.get("/", async (req, res) => {
	try {
		const currentUser = await User.find({});
		res.render("user/index.ejs", {
			"user": currentUser
		})
	} catch (err) {
		res.send(err)
	}
});


// User Registration
router.get("/new", async (req, res) => {
	res.render("user/new.ejs");
});

router.post("/", async (req, res) => {
	try {

	} catch (err) {
		res.send(err)
	}
});


module.exports = router;