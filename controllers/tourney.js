console.log("controllers/tourney.js is running...");


// Requires npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");
const Tourney  = require("../models/tourney");


// Index Route
router.get("/", async (req, res) => {
	try {
		const allTourneys = await Tourney.find({})
		res.render("tourney/index.ejs", {
			"tourneys": allTourneys
		})
	} catch (err) {
		res.send(err)
	}
});


// New Route
router.get("/new", async (req, res) => {
	try {
		res.render("tourney/new.ejs");
	} catch (err) {
		res.send(err)
	}
});

router.post("/", async (req, res) => {
	try {
		const newTourney = await Tourney.create(req.body);
		res.redirect("/tourneys");
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const shownTourney = await Tourney.findById(req.params.id);
		const shownSlave = await Slave.findById(req.params.id);
		const foundUser = await User.findOne({"slaves._id":req.params.id});
		res.render("tourney/show.ejs", {
			"slave": shownSlave,
			"user": req.session,
			"displayName": req.session.displayName,
			"tourney": shownTourney
		})
	} catch (err) {
		res.send(err)
	}
});


// Delete Route
router.delete("/:id", async (req, res) => {
	try {
		const deletedTourney = await Tourney.findByIdAndRemove(req.params.id);
		res.redirect("/tourneys");
	} catch (err) {
		res.send(err)
	}
});


// Edit Route
router.get("/:id/edit", async (req, res) => {
	const foundTourney = await Tourney.findById(req.params.id);
	res.render("tourney/edit.ejs", {
		"tourney": foundTourney 
	})
});

router.put("/:id", async (req, res) => {
	try {
		const updatedTourey = await Tourney.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.redirect("/tourneys");
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;