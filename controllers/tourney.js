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
		const currentUser = await User.findById(req.session.userId);
		const allTourneys = await Tourney.find({})
		res.render("tourney/index.ejs", {
			"tourneys": allTourneys,
			"user": currentUser
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


// Tournament Begin
router.post("/:id/beginTournament", async (req, res) => {
	try {
		const selectedSlave = await Slave.findById(req.params.id);
		console.log(`selectedSlave: ${selectedSlave}`);
		const selectedTournament = await Tourney.findOne({name: "Bronze Cup"});
		console.log(`selectedTournament: ${selectedTournament}`);
		console.log(`${selectedTournament} has begun!`);
		if (selectedTournament.fighters[0].pwr > selectedTournament.fighters[1].pwr) {
			console.log(`${selectedTournament.fighters[0].name} has won the round!`);
		} else {
			console.log(`${selectedTournament.fighters[1].name} has won the round!`);
		}
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const foundUser = await User.findById(req.session.userId);
		const shownTourney = await Tourney.findById(req.params.id);
		res.render("tourney/show.ejs", {
			"user": foundUser,
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