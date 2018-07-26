console.log("controllers/user.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");
const Tourney = require("../models/tourney");


// Index Route
router.get("/", async (req, res) => {
	try {
		const allUsers = await User.find({});
		res.render("user/index.ejs", {
			"users": allUsers
		})
	} catch (err) {
		res.send(err)
	}
});


// New Route
router.get("/new", async (req, res) => {
	res.render("user/new.ejs");
});

router.post("/", async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		res.redirect("/users");
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
    try {
        console.log("Show Route");
        const currentUser = await User.findById(req.params.id);
        res.render("user/show.ejs", {
            "user": currentUser
        })
    } catch (err) {
        res.send(err)
    }
});


// Delete Route
router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndRemove(req.params.id);
		const slaveIds = [];
		for (let i = 0; i < deletedUser.slaves.length; i++) {
			slaveIds.push(deletedUser.slaves[i]._id);
		}
		Slave.remove( { _id: { $in: slaveIds } } );
		req.session.loggedIn = false;
		res.redirect("/auth");
 	} catch (err) {
 		res.send(err)
	}
});


// Edit Route
router.get("/:id/edit", async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		res.render("user/edit.ejs", {
			"user": foundUser
		})
	} catch (err) {
		res.send(err)
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.redirect("/users");
	} catch (err) {
		res.send(err);
	}
});


module.exports = router;