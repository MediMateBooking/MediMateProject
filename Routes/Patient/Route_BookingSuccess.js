const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/appointment/:appID", async (req, res) => {
  try {

      const appID = req.params.appID

      const currentAppointment = await db
          .DbConn()
          .collection("appointments")
          .find({ appoitmentID: appID })
          .toArray();

      if (currentAppointment.length === 0) throw new Error("Cannot find Appointment");

    res.render("Patient/bookingSuccess",{currentAppointment : currentAppointment});
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;