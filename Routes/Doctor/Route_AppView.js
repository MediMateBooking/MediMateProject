const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.post("/doctor/appointments/view/:appid", async (req, res) => {
  try {
   const appid = req.params.appid;

     const matchingAppointment = await db
         .DbConn()
         .collection("appointments")
         .findOne({ appoitmentID: appid });

   res.json(matchingAppointment);

  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;
