console.log("models/slave.js is running...");



// Required npm modules
const mongoose = require("mongoose");


// Slaves schema for use in tournament battles.
const slaveSchema = mongoose.Schema({
	name: String,
	img: String,
	hp: Number,
	atk: Number
});

const namesList = ["Julianus Dama", "Vel Angelus", "Tertius Valens", "Lucius Ecdicius", "Caelus Constans", "Marcellus Balbus", "Opiter Postumus"];

module.exports = mongoose.model("Slave", slaveSchema);