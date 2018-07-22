console.log("controllers/user.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");


// User Page Route
router.get("/:id", async (req, res) => {
	try {
		console.log("Show Route");
		const currentUser = await User.findById(req.params.id);
		res.render("user/show.ejs", {
			"user": currentUser
		})
	} catch (err) {
		res.send(err)
	}
});


module.exports = router;