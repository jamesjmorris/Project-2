console.log("controllers/slave.js is running...");


// Required npm models
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");
const Tourney = require("../models/tourney");


// Index Route
router.get("/", async (req, res) => {
	try {
		const allSlaves = await Slave.find({});
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
		res.render("slave/new.ejs", {
		});
	} catch (err) {
		res.send(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const foundUser = await User.findById(req.session.userId);
		const newSlave = await Slave.create({name: req.body.name});
		foundUser.slaves.push(newSlave);
		const data = await foundUser.save();
		res.redirect("/slaves");
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const shownSlave = await Slave.findById(req.params.id);
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
		const currentUser = await User.findOne({"slaves._id":req.params.id});
		currentUser.slaves.id(req.params.id).remove();
		const savedCurrentUser = await currentUser.save();
		res.redirect("/slaves");
	} catch (err) {
		res.send(err)
	}
});


// Edit Route
router.get("/:id/edit", async (req, res) => {
	const foundSlave = await Slave.findById(req.params.id);
	res.render("slave/edit.ejs", {
		"slave": foundSlave
	})
});

router.put("/:id", async (req, res) => {
	try {
		const updatedSlave = await Slave.findByIdAndUpdate(req.params.id, req.body, {new: true} );
		const currentUser = await User.findOne({"slaves._id":req.params.id});
		currentUser.slaves.id(req.params.id).remove();
		const savedCurrentUser = await currentUser.save();
		const newUser = await User.findById(req.session.userId);
		newUser.slaves.push(updatedSlave);
		const savedNewUser = await newUser.save();
		res.redirect("/slaves");
	} catch (err) {
		res.send(err)
	}
});

module.exports = router;