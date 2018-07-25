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
				req.session.loggedIn = true;
				req.session.displayName = loginAttempt.displayName;
				req.session.userId = loginAttempt.id;
				res.redirect("/");
			}
		}
	} catch (err) {
		res.send(err)
	}
});



router.get("/logout", async (req, res) => {
	try {
	req.session.destroy((err) => {
		if (err) {
			res.send("Error destroying session")
		} else {
			res.redirect("/auth")
		}
	})
} catch {
	res.send(err)
}
});

module.exports = router;