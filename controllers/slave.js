console.log("controllers/slave.js is running...");


// Required npm models
const express = require("express");
const router = express.Router();
const Slave = require("../models/slave");
const User = require("../models/user");


router.get('/', (req, res) => {
  Slave.find({}, (err, foundSlaves) => {
      res.render('slave/index.ejs', {
        slaves: foundSlaves
      });
  });
});

router.post("/", async (req, res) => {
	try {
		const foundUser = await User.findBYId(req.body.userId);
		const newSlave = await Slave.create(req.body);
		foundUser.slaves.push(newSlave);
		const data = await foundUser.save();
		res.redirect("/user");
	} catch (err) {
		res.send(err);
	}
});

// Create Route
router.get('/new', (req, res) => {
  res.render('slave/new.ejs');
});

// Edit Route
router.get("/:id/edit", async (req, res) => {
    const foundSlave = await Slave.findById(req.params.id);
    console.log(`foundSlave: ${foundSlave}`);
    res.render("slave/edit.ejs", {
        "slave": foundSlave,
    })
});

router.put("/:id", async (req, res) => {
    try {
        const updatedSlave = await Slave.findByIdAndUpdate(req.params.id, req.body, {new: true} );
        console.log(`updatedSlave: ${updatedSlave}`);
        const currentUser = await User.findOne({ _id: req.session.userId });
        console.log(`currentUser.slaves: ${currentUser.slaves}`);
        } catch (err) {
        res.send(err)
    }
});

// Delete Route
router.delete("/:id", async (req, res) => {
	try {
		const deletedSlave = await Slave.findByIdAndRemove(req.params.id);
		const foundUser = await User.findOne({"slaves._id":req.params.id});
		foundUser.slaves.id(req.params.id).remove();
		foundUser.save();
		res.reirect("/user")
	} catch (err) {

	}
});

module.exports = router;