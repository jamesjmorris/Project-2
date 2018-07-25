console.log("models/slave.js is running...");



// Required npm modules
const mongoose = require("mongoose");


// Slaves schema for use in tournament battles.
const slaveSchema = mongoose.Schema({
	name: String,
	img: String,
	hp: Number,
	atk: Number,
});


module.exports = mongoose.model("Slave", slaveSchema);


// Fucntions and Variables
// A list of names that are chosen at random upon creaing a slave.
// const namesList = ["Julianus Dama", "Vel Angelus", "Tertius Valens", "Lucius Ecdicius", "Caelus Constans", "Marcellus Balbus", "Opiter Postumus"];

// const generateSlave = () => {
// 	for (let i = 0; i < 4; i++) {
// 		Slave.create({ name: namesList[Math.floor(Math.random()*namesList.length)], hp: Math.floor(Math.random() * (36 - 12) + 12), atk: Math.floor(Math.random() * (27 - 1) + 1) });
// 	};
// };