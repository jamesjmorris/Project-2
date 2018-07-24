console.log("controllers/tourney.js is running...");


// Requires npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Slave = require("../models/slave");
const Tourney  = require("../models/tourney");