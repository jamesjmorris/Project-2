console.log("models/user.js is running...");

// Require npm modules 
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Slave = require("./slave");


// User Schema for new users
const userSchema = mongoose.Schema({
	displayName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	slaves: [Slave.schema]
});

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function(next) {
	const existingUser = await User.findOne({username: this.username})
	if (!existingUser) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});


module.exports = User;