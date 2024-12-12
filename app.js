const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongodb = require("mongodb");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const session = require("express-session");
const multer = require("multer");

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

const ObjectId = mongodb.ObjectId;

const db = require("./database/database");

app.use(express.static("public"));
app.use("/patient/images", express.static("images"));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "Views")); 
app.set("view engine", "ejs"); // set the view engine to ejs for rendering the files in views folder with .ejs extension, 

//security Route
const secureApi = require("./Routes/securityApi/Api");
app.use("/", secureApi);

//signup Route
const signUpRoute = require("./Routes/signUp");
app.use("/", signUpRoute);

//login Route
const loginRoute = require("./Routes/login");
app.use("/", loginRoute);

//Doctor Dashboard
const docDashRoute = require("./Routes/doctorDashboard");
app.use("/", docDashRoute);

//Patient Dashboard
const patDashRoute = require("./Routes/patientDashboard");
app.use("/", patDashRoute);

//forgotPassword
const forgotPasswordRoute = require("./Routes/forgotPassword");
app.use("/", forgotPasswordRoute);

//appointments
const appointmentsRoute = require("./Routes/appointments");
app.use("/", appointmentsRoute);

//doctorList
const doctorListRoute = require("./Routes/doctorList");
app.use("/", doctorListRoute);

//profileSettings
const profileSettingsRoute = require("./Routes/profileSettings");
app.use("/", profileSettingsRoute);

//bookingSuccess
const bookingSuccessRoute = require("./Routes/bookingSuccess");
app.use("/", bookingSuccessRoute);

//patientList
const patientListRoute = require("./Routes/patientList");
app.use("/", patientListRoute);

//docProfileSettings
const docProfileSettingsRoute = require("./Routes/docProfileSettings");
app.use("/", docProfileSettingsRoute);

//docReviews
const docReviewsRoute = require("./Routes/docReviews");
app.use("/", docReviewsRoute);

//patientProfile
const docToPatientProfileRoute = require("./Routes/docTopatientProfile");
app.use("/", docToPatientProfileRoute);

//index
app.get("/", function (req, res) {
  res.render("index");
});

//adminDashboard
const adminDashRoute = require("./Routes/adminDashboard");
app.use("/", adminDashRoute);

//404
app.use(function (req, res) {
  res.status(404).render("404");
});

db.connectTo()
  .then(() => {
    app.listen(port, () => {
      console.log("server running on http://localhost:" + port);
    });
  })
  .catch((err) => console.log(err.message));
