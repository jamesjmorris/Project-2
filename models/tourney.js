console.log("tourneys.js is running...");


// Required npm modules
const mongoose = require("mongoose");


// Required schema for tournaments
const tourneySchema = mongoose.Schema({
	name: String,
	capacity: Number,
	fighters: [],
	roundWinners: []
});

tourneySchema.methods.runTourney = () => {
	console.log("ROUND START");
	console.log(`${this.fighters}`);
	// if (this.fighters[0].pwr > this.fighters[1].pwr) {
	// 	console.log(`${this.fighters[0].name} has won the round!`);
	// 	this.roundWinners.push(this.fighters[0]);
	// } else {
	// 	console.log(`${this.fighters[1].name} has wond the round!`);
	// 	this.roundWinners.push(this.fighters[0]);
	// }
};

module.exports = mongoose.model("Tourney", tourneySchema);