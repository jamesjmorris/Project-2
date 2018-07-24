console.log("server is running...");


// Required npm modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");


// Required database
require("./db/db");

// Setting up session
app.use(session({
	secret: "insert_subject_string_here",
	resave: false,
	saveUninitialized: false
}));

// Required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

// Required controllers for router
// Tournaments controller
const tournamentController = require("./controllers/tourney");
app.use("/tourneys", tournamentController);

// User controller
const userController = require("./controllers/user");
app.use("/users", userController);

// Slaves controller
const slaveController = require("./controllers/slave");
app.use("/slaves", slaveController);

// Auth controller
const authController = require("./controllers/auth");
app.use("/auth", authController);
app.use((req, res, next) => {
	if (req.session.loggedIn === true) {
		return next();
	} else {
		res.redirect("/auth");		
	}
});


// Home Route
app.get("/", (req, res) => {
	console.log("Home Route");
	res.render("index.ejs", {
		"displayName": req.session.displayName,
		"userId": req.session._id
	})
});


// Listening for server
app.listen(3030, () => {
	console.log("server.js is listening on port 3030.");
});