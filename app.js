// Importing Required Modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongodb = require("mongodb");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const session = require("express-session");
const multer = require("multer");
const requireDirectory = require('require-directory');

// Multer Configuration for File Uploads
const configStatus = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Setting Up the Express App and Environment Variables
const app = express();

dotenv.config();
const port = process.env.PORT || 4000;
console.log(port);

// Session Configuration
const secret = crypto.randomBytes(32).toString("hex");

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Multer Configuration for File Uploads and MongoDB ObjectId
const upload  = multer({storage:configStatus });
const ObjectId = mongodb.ObjectId;

const db = require("./database/database"); // Database Connection

app.use(express.static("public")); // Static Files Middleware

app.use("/patient/images", express.static("images"));
app.use("/patient/profile/images", express.static("images"));
app.use("/patient/changePassword/images", express.static("images"));
app.use("/patient/appointment/images", express.static("images"));
app.use("/patient/systemFeedbacks/images", express.static("images"));
app.use("/patient/favorites/images", express.static("images"));
app.use("/patient/view/images", express.static("images"));
app.use("/patient/book/images", express.static("images"));
app.use("/appointment/images", express.static("images"));

app.use("/doctor/images", express.static("images"));
app.use("/doctor/profile/images", express.static("images"));
app.use("/doctor/password/images", express.static("images"));

app.use("/admin/doctors/images", express.static("images"));
app.use("/doctor/docAppointments/images", express.static("images"));
app.use("/doctor/docReviews/images", express.static("images"));

app.use("/node_modules", express.static(path.join(__dirname, "node_modules"))); // Serving Node Modules


// Middleware for Parsing Request Bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//  Setting Up the View Engine
app.set("views", path.join(__dirname, "Views")); 
app.set("view engine", "ejs"); // set the view engine to ejs for rendering the files in views folder with .ejs extension, 


// Automatically Loading Routes automatically from the Routes folder
const routes = requireDirectory(module, './Routes');
Object.keys(routes).forEach((key) => loadRoutes(routes[key]));

function loadRoutes(routeModule) {
  if (typeof routeModule === 'object') {
      
      Object.keys(routeModule).forEach((key) => loadRoutes(routeModule[key]));
  } else if (typeof routeModule === 'function') {
      app.use(routeModule);
  }
}


// Defining the Home Route
app.get("/", function (req, res) {
  res.render("Common/index");
});

// Handling 404 Errors
app.use(function (req, res) {
  res.status(404).render("Common/404");
});

// Connecting to the Database and Starting the Server
db.connectTo()
  .then(() => {
    app.listen(port, () => {
      console.log("server running on http://localhost:" + port);
    });
  })
  .catch((err) => console.log(err.message));
