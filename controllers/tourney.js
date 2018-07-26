console.log("controllers/tourney.js is running...");

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");
const Tourney  = require("../models/tourney");


router.get("/", async (req, res) => {
	const allSlaves = await Slave.find({})
	const allTourneys = await Tourney.find({})
	res.render("tourney/index.ejs", {
		"slaves": allSlaves,
		"tourneys": allTourneys
	})
});


// New Route
router.get("/new", async (req, res) => {
	const allSlaves = await Slave.find({})
	const allTourneys = await Tourney.find({})
	res.render("tourney/new.ejs", {
		"slaves": allSlaves,
		"tourneys": allTourneys
	})
});




// Show Route
router.get('/:id', (req, res) => {
  Tourney.findById(req.params.id, (err, foundTourney) => {
    res.render('tourney/show.ejs', {
      tourney: foundTourney
    });
  });
});




router.post("/", async (req, res) => {
	try {
		const foundUser = await User.findById(req.session.userId);
		console.log(`foundUser: ${foundUser}`);
		const newTourney = await Tourney.create({name: req.body.name, capacity: req.body.capacity});
		console.log(`newTourney: ${newTourney}`);
		res.redirect("/tourney");
	} catch (err) {
		res.send(err)
	}
});





module.exports = router;

