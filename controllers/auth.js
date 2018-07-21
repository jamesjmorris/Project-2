console.log("controllers/auth.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");


router.get("/", (req, res) => {
	res.render("auth/login.ejs", {
		"message": req.session.message
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