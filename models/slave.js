console.log("models/slave.js is running...");



// Required npm modules
const mongoose = require("mongoose");


// Slaves schema for use in tournament battles.
const slaveSchema = mongoose.Schema({
	name: String
	// hp: Number,
	// atk: Number
});

module.exports = mongoose.model("Slave", slaveSchema);