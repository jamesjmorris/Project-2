console.log("tourneys.js is running...");


// Required npm modules
const mongoose = require("mongoose");


// Required schema for tournaments
const tourneySchema = mongoose.Schema({
	capacity: Number,
	fighters: [],
});

tourneySchema.methods.runTourney = function() {
	console.log("ROUND START");
};

module.exports = mongoose.model("Tourney", tourneySchema);