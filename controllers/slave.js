console.log("controllers/slave.js is running...");


// Required npm models
const express = require("express");
const router = express.Router();
const Slave = require("../models/slave");
const User = require("../models/user");


// Index Route
router.get("/", async (req, res) => {
	try {
		const allSlaves = await Slave.find({})
		res.render("slave/index.ejs", {
			"slaves": allSlaves
		})
	} catch (err) {
		res.send(err)
	}
});


// New Route
router.get("/new", async (req, res) => {
	try {
		res.render("slave/new.ejs");
	} catch (err) {
		res.send(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const foundUser = await User.findById(req.session.userId);
		console.log(`foundUser: ${foundUser}`);
		const newSlave = await Slave.create({name: req.body.name});
		console.log(`newSlave: ${newSlave}`);
		foundUser.slaves.push(newSlave);
		const data = await foundUser.save();
		console.log(`foundUser: ${foundUser}`);
		res.redirect("/slaves");
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const shownSlave = await Slave.findById(req.params.id);
		console.log("Slave Found")
		const foundUser = await User.findOne({"slaves._id":req.params.id});
		res.render("slave/show.ejs", {
			"slave": shownSlave,
			"user": req.session.userId,
			"displayName": req.session.displayName
		})
	} catch (err) {
		res.send(err)
	}
});


// Delete Route
router.delete("/:id", async (req, res) => {
	try {
		const deletedSlave = await Slave.findByIdAndRemove(req.params.id);
		const foundUser = await User.findOne({"slaves._id":req.params.id});
		foundUser.slaves.id(req.params.id).remove();
		foundUser.save();
		res.reirect("/users")
	} catch (err) {
		res.send(err)
	}
});


// Edit Route
router.get("/:id/edit", async (req, res) => {
	const foundSlave = await Slave.findById(req.params.id);
	const allUsers = await User.find({});
	const foundSlaveUser = await User.findOne({"slaves._id":req.params.id});
	res.render("slave/edit.ejs", {
		"slave": foundSlave,
		"users": allUsers,
		"slaveUser": foundSlaveUser
	})
});

router.put("/:id", async (req, res) => {
	try {
		const updatedSlave = await Slave.findByIdAndUpdate(req.params.id, {name: req.body.name});
		const foundUser = await User.findOne({"slaves._id":req.params.id});
		if (foundUser._id.toString() !== req.body.userId) {
			foundUser.slaves.id(req.params.id).remove();
			const savedFoundUser = await foundUser.save();
			const newUser = await User.findById(req.body.userId);
			newUser.slaves.push(updatedSlave);
			const savedNewUser = await newUser.save();
			res.redirect("/slaves/"+req.params.id);
		} else {
			foundUser.slaves.id(req.params.id).remove();
			foundUser.slaves.push(updatedSlave);
			const data = await foundUser.save();
			res.redirect("/slaves/"+req.params.id);
		}
	} catch (err) {
		res.send(err)
	}
});

module.exports = router;