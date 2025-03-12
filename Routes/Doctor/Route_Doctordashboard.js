const express = require("express");
const router = express.Router();

const db = require("../../database/database");
const formateDate = require("../../Extra/Date");

router.get("/doctor/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    const currentDoctor = await db
      .DbConn()
      .collection("doctors")
      .find({ userID: userID })
      .toArray();

    const totalPatient = await db
      .DbConn()
      .collection("patients")
      .find()
      .toArray();

    const totalDoctors = await db
      .DbConn()
      .collection("doctors")
      .find()
      .toArray();

    const totalAppointments = await db
      .DbConn()
      .collection("appointments")
      .find({ docID: userID })
      .toArray();

    const today = formateDate.getFormattedDate(new Date());

    const matchingAppointments = await db
      .DbConn()
      .collection("appointments")
      .find({ docID: userID, applyDate: today })
      .toArray();

    const patinetCountPercentage =
      (totalPatient.length / (totalPatient.length + totalDoctors.length)) * 100;
    const appointmentsCountPercentage =
      (matchingAppointments.length / totalAppointments.length) * 100;

    if (currentDoctor.length === 0) throw new Error("cannot find User");

    if (!currentDoctor[0].mandotaryFieldFill)
      return res.redirect(`/doctor/profile/${userID}`);

    res.render("Doctor/doctorDashboard", {
      currentDoctor: currentDoctor,
      totalPatient: totalPatient.length,
      patinetCountPercentage: patinetCountPercentage,
      appointmentsCountPercentage: appointmentsCountPercentage,
      matchingAppointments: matchingAppointments.length,
      totalAppointments: totalAppointments.length,
      today: today,
    });
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
