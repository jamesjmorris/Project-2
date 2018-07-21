console.log("controllers/auth.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const session = require("express-session");
const bcrypt = require("bcrypt");


// Session requirements
router.get("/", (req, res) => {
	let message = "";
	if (req.session.message) {
		message = req.session.message
	}
	res.render("auth/login.ejs", {
		"message": message
	})
});

router.post("/register", async (req, res) => {
	try {
		await User.create(req.body)
		console.log(req.body);
		res.redirect("/")
	} catch (err) {
		console.log(err)
		req.session.message = err.message
		res.redirect("/")
	}
});


router.post("/login", async (req, res) => {
	try {
		const loginAttempt = await User.findOne({username: req.body.username})
		if (!loginAttempt) {
			await bcrypt.compare("failstate", "winstate");
			req.session.message = "Invalid Credentials"
			res.redirect("/")
		} else {
			const validLogin = await bcrypt.compare(req.body.password, loginAttempt.password)
			if (!validLogin) {
				req.session.message = "Invalid Credentials"
				res.redirect("/")
			} else {
				res.render("index.ejs")
			}
		}
	} catch (err) {
		res.send(err)
	}

});


router.get("/logout", async (req, res) => {
	req.sessions.destroy((err) => {
		if (err) {
			res.send("Error destroying sesion")
		} else {
			res.redirect("/")
		}
	})
});

module.exports = router;