const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongodb = require("mongodb");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const session = require("express-session");
const multer = require("multer");
const requireDirectory = require('require-directory');

const configStatus = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;
console.log(port);

const secret = crypto.randomBytes(32).toString("hex");

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const upload  = multer({storage:configStatus });

const ObjectId = mongodb.ObjectId;

const db = require("./database/database");

app.use(express.static("public"));

// Patient Images
app.use("/patient/images", express.static("images"));

app.use("/doctor/images", express.static("images"));
app.use("/doctor/profile/images", express.static("images"));

app.use("/admin/doctors/images", express.static("images"));
app.use("/patient/profile/images", express.static("images"));
app.use("/patient/changePassword/images", express.static("images"));


// Doctor Images
app.use("/doctor/profile/images", express.static("images")); // profile

app.use("/node_modules", express.static(path.join(__dirname, "node_modules"))); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs"); // set the view engine to ejs for rendering the files in views folder with .ejs extension, 

const routes = requireDirectory(module, './Routes');
Object.keys(routes).forEach((key) => loadRoutes(routes[key]));

function loadRoutes(routeModule) {
  if (typeof routeModule === 'object') {

    Object.keys(routeModule).forEach((key) => loadRoutes(routeModule[key]));
  } else if (typeof routeModule === 'function') {
    app.use(routeModule);
  }
}


//index
app.get("/", function (req, res) {
  res.render("Common/index");
});

//404
app.use(function (req, res) {
  res.status(404).render("Common/404");
});

db.connectTo()
  .then(() => {
    app.listen(port, () => {
      console.log("server running on http://localhost:" + port);
    });
  })
  .catch((err) => console.log(err.message));
  