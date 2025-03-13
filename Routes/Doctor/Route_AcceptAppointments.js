const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.post("/doctor/appointments/accept/:appid", async (req, res) => {
  try {
   const appid = req.params.appid;

     const allAppointments = await db
         .DbConn()
         .collection("appointments")
         .updateOne({ appoitmentID: appid }
            , { $set: { status: "Accepted" } }
         );

   res.json({status : true});

  } catch (error) {
    res.render("common/500",{error:error});
  }
});


router.post("/doctor/appointments/reject/:appid", async (req, res) => {
  try {
   const appid = req.params.appid;

     const allAppointments = await db
         .DbConn()
         .collection("appointments")
         .updateOne({ appoitmentID: appid }
            , { $set: { status: "Rejected" } }
         );

   res.json({status : true});

  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;
