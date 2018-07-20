console.log("models/user.js is running...");


// Require npm modules 
const mongoose = require("mongoose");
const Slave = require("./slave");


// User Schema for new users
const userSchema = mongoose.Schema({
	displayName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	slaves: []
});

module.exports = mongoose.model("User", userSchema);