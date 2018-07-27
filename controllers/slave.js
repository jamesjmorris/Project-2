console.log("controllers/slave.js is running...");


// Required npm models
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");
const Tourney = require("../models/tourney");


// Functions and Variables
// Generates a new slave with randomized data.
const namesList = ["Julianus Dama", "Vel Angelus", "Tertius Valens", "Lucius Ecdicius", "Caelus Constans", "Marcellus Balbus", "Opiter Postumus"];
const generateSlave = () => {
  for (let i = 0; i < 4; i++) {
    Slave.create({ name: namesList[Math.floor(Math.random()*namesList.length)], pwr: Math.random() });
  };
};


// Index Route
router.get("/", async (req, res) => {
	try {
		const allSlaves = await Slave.find({})
		// await clearDb;
		console.log(`allSlaves: ${allSlaves}`);
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
		// await clearDb;
		await generateSlave();
		const currentUser = await User.findById(req.session.userId);
		const allSlaves = await Slave.find({});
		console.log(`allSlaves: ${allSlaves}`);
		res.render("slave/new.ejs", {
			"slaves": allSlaves,
			"user": currentUser
		});
	} catch (err) {
		res.send(err);
	}
});


// Purchase Route
router.post("/:id/purchase", async (req, res) => {
	try {
		const foundUser = await User.findById(req.session.userId);
		const foundSlave = await Slave.findById(req.params.id);
		foundUser.slaves.push(foundSlave);
		const savedUser = await foundUser.save();
		console.log(`savedUser: ${savedUser}`);
	} catch (err) {
		res.send(err)
	}
});


// Tournament Entry Route
router.post("/:id/enterTournament", async (req, res) => {
	try {
		const selectedSlave = await Slave.findById(req.params.id);
		console.log(`selectedSlave: ${selectedSlave}`);
		const selectedTournament = await Tourney.findOne({name: "Bronze Cup"});
		console.log(`selectedTournament: ${selectedTournament}`);
		if (selectedTournament.fighters[1] === "Spot Open") {
			const updatedTournament = await selectedTournament.fighters.unshift(selectedSlave);
			console.log(`updatedTournament: ${updatedTournament}`);
			const savedTournament = await selectedTournament.save();
			console.log(`savedTournament: ${savedTournament}`);
		} else {
			console.log(`${selectedTournament.name} is full!`);
		}
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const currentUser = await User.findById(req.session.userId);
		console.log(`currentUser: ${currentUser}`);
		const shownSlave = await Slave.findById(req.params.id);
		console.log(`shownSlave: ${shownSlave}`);
		res.render("slave/show.ejs", {
			"slave": shownSlave,
			"user":currentUser
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