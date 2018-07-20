console.log("server.js is running...");


// Required npm modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");


// Required database
require("./db/db");

// Required middleware
app.use(bodyParser.)