console.log("controllers/slave.js is running...");


// Required npm models
const express = require("express");
const router = express.Router();
const Slave = require("../models/slave");
const User = require("../models/user");


// Create Route
router.get("/new", async (req, res) => {
	try {
		res.render("slave/new.ejs")
	} catch (err) {
		res.send(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const newSlave = await Slave.create(req.body);
		console.log(newSlave);
		foundUser.slaves.push(newSlave);
		const data = await foundUser.save();
		res.redirect("/user");
	} catch (err) {
		res.send(err);
	}
});


// Delete Route
router.delete("/:id", async (req, res) => {
	try {
		const deletedSlave = await Slave.findByIdAndRemove(req.params.id);
		const foundUser = await User.findOne({"slaves._id":req.params.id});
		foundUser.slaves.id(req.params.id).remove();
		foundUser.save();
		res.reirect("/user")
	} catch (err) {

	}
});

module.exports = router;