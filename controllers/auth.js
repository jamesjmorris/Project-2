console.log("controllers/auth.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");


router.post("/login", async (req, res) => {
	try {
		req.session.loggedIn = true;
		req.session.username = req.body.username;
		res.redirect("/");
	} catch (err) {
		res.send(err)
	}
});


router.get("/logout", async (req, res) => {
	try {
		req.sessions.destroy((err) => {
			if (err) {
				res.send("Error destroying sesion")
			} else {
				res.redirect("/")
			}
		})
	} catch (err) {
		res.send(err)
	}

});

module.exports = router;