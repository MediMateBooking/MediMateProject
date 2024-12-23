const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const db = require("../../database/database");

router.get("/patient/changePassword/:id", async (req, res) => {
  try {
    const userID = req.params.id;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .find({ userID: userID })
      .toArray();

    if (currentPatient.length === 0) throw new Error("cannot find User");

    res.render("Patient/changePassword", { currentPatient: currentPatient }); //render the patientDashboard.ejs file. render keyword is used to render the ejs file
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
