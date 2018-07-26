console.log("models/slave.js is running...");



// Required npm modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Slaves schema for use in tournament battles.
const slaveSchema = mongoose.Schema({
	name: String,
	img: String,
	pwr: Number
});


const Slave = mongoose.model("Slave", slaveSchema);
module.exports = Slave;