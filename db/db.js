console.log("db.js is running...");


// Required npm modules
const mongoose = require("mongoose");


// Create the db and connect
// const url = "mongodb://localhost:27017/gladiator";
// mongoose.connect(url, { useNewUrlParser: true });

const mongoUri = process.env.MONGODB_URI ||"mongodb://localhost:27017/gladiator";
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
	console.log("Mongoose is connected.");
});

mongoose.connection.on("error", (err) => {
	console.log(err, "Mongoose failed to connect.");
});

mongoose.connection.on("disconnected", () => {
	console.log("Mongoose has been disconnected.");
});