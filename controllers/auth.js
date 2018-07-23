console.log("controllers/auth.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const session = require("express-session");
const bcrypt = require("bcrypt");


// Register new user
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
		const newUser = await User.create(req.body)
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
			console.log("invalid username");
			req.session.message = "Invalid Credentials"
			res.redirect("/")
		} else {
			const validLogin = await bcrypt.compare(req.body.password, loginAttempt.password)
			if (!validLogin) {
				console.log("invalid password")
				req.session.message = "Invalid Credentials"
				res.redirect("/")
			} else {
				console.log("logging in")
				console.log(req.body.id);
				req.session.loggedIn = true;
				req.session.displayName = req.body.displayName;
				res.redirect("/");
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

// module.exports = router;