const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/doctor/docAppointments/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    const currentDoctor = await db
      .DbConn()
      .collection("doctors")
      .find({ userID: userID })
      .toArray();

    if (currentDoctor.length === 0) throw new Error("Cannot find User");

    if (!currentDoctor[0].mandotaryFieldFill) {
      return res.redirect(`/doctor/profile/${userID}`);
    }

    // Pass the first doctor record as "key" to match the EJS template
    res.render("Doctor/docAppointments", { key: currentDoctor[0] });
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
