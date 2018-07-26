console.log("tourneys.js is running...");


// Required npm modules
const mongoose = require("mongoose");


// Required schema for tournaments
const tourneySchema = mongoose.Schema({
	name: {type: String, required: true},
	capacity: {type: Number, required: true},
	fighters: [],
});

// tourneySchema.methods.runTourney = function() {
// 	console.log("ROUND START");
// };





// const bronzeCup = new tourneySchema({name: "Bronze Cup", capacity: 2});


// const silverCup = new tourneySchema({name: "Silver Cup", capacity: 4});


// const goldCup = new tourneySchema({name: "Gold Cup", capacity: 8});








module.exports = mongoose.model("Tourney", tourneySchema);

