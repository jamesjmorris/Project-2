console.log("controllers/tourney.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const Tourney = require("../models/tourney");


router.get("/", (req, res) => {
	res.render("tourney/index.ejs", {
	})
});


router.post("/login", (req, res) => {
		req.session.loggedIn = true;
		req.session.displayName = req.body.displayName;
		req.session.username = req.body.username;
		console.log(req.session);
		res.redirect("/");
});


router.get("/logout", (req, res) => {
	req.sessions.destroy((err) => {
		if (err) {
			res.send("Error destroying sesion")
		} else {
			res.redirect("/")
		}
	})
});

module.exports = router;