console.log("models/tourneys.js is running...");


// Required npm modules
const mongoose = require("mongoose");


// Required schema for tournaments
const tourneySchema = mongoose.Schema({
	name: String,
	capacity: Number,
	fighters: [],
	roundWinners: []
});

const Tourney = mongoose.model("Tourney", tourneySchema);
module.exports = Tourney;