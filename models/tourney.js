console.log("tourneys.js is running...");


// Required npm modules
const mongoose = require("mongoose");


// Required schema for tournaments
const tourneySchema = mongoose.Schema({
	finalBracket: [];
});

module.exports = mongoose.model("Tourney", tourneySchema);