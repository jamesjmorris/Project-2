console.log("controllers/user.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");



router.get('/', (req, res) => {
  User.find({}, (err, foundUsers) => {
      res.render('user/index.ejs', {
        users: foundUsers
      });
  });
});



// User Registration
router.get("/new", async (req, res) => {
	res.render("user/new.ejs");
});

router.post("/", async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		res.redirect("/")
	} catch (err) {
		res.send(err)
	}
});


// User Page Route
router.get("/:id", async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.id);
		res.render("user/show.ejs", {
			"user": currentUser
		})
	} catch (err) {
		res.send(err)
	}
});


module.exports = router;