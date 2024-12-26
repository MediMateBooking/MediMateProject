const express = require("express");
const router = express.Router();
const db = require("../../database/database");

router.get("/patient/systemFeedbacks/:id", async (req, res) => {
  try {
    const userID = req.params.id;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .find({ userID: userID })
      .toArray();

    if (currentPatient.length === 0) throw new Error("cannot find User");

    res.render("Patient/systemFeedbacks", { currentPatient: currentPatient });
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;

