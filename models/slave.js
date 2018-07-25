console.log("models/slave.js is running...");



// Required npm modules
const mongoose = require("mongoose");


// Fucntions and Variables
// A list of names that are chosen at random upon creaing a slave.
const namesList = ["Julianus Dama", "Vel Angelus", "Tertius Valens", "Lucius Ecdicius", "Caelus Constans", "Marcellus Balbus", "Opiter Postumus"];

// Slaves schema for use in tournament battles.
const slaveSchema = mongoose.Schema({
	name: String,
	img: String,
	hp: Number,
	atk: Number,
});

slaveSchema.methods.attack = (min, max) => {
	const dmg = this.atk + Math.random() * (max - min) + min;
	return dmg
};


const Slave = mongoose.model("Slave", slaveSchema);
module.exports = Slave;


const generateSlave = () => {
	for (let i = 0; i < 4; i++) {
		Slave.create({ name: namesList[Math.floor(Math.random()*namesList.length)], hp: Math.floor(Math.random() * (36 - 12) + 12), atk: Math.floor(Math.random() * (27 - 1) + 1) });
	};
};


const populateSlaveMarket = () => {
	for (let i = 0; i < 4; i++) {
		const newSlave = generateSlave();
		console.log(`newSlave: ${newSlave}`);
		availableSlaves.push(newSlave);
	}
};