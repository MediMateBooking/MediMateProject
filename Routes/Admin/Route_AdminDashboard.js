const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/admin/:id", async (req, res) => {
  try {
    const dynamicRouteCode = req.params.id;

    const activeAdmin = await db
      .DbConn()
      .collection("admin")
      .find({ dynamicRouteCode: dynamicRouteCode })
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
      .find()
      .toArray();

  const totalReviews= await db
      .DbConn()
      .collection("reviews")
      .find()
      .toArray();

    if (activeAdmin.length === 0) throw new Error("cannot find Admin");

    res.render("Admin/adminDashboard", 
      { activeAdmin: activeAdmin,
        totalPatient: totalPatient,
        totalPatientCount : totalPatient.length,
        totalDoctors:totalDoctors,
        totalDoctorsCount : totalDoctors.length,
        totalAppointments:totalAppointments,
        totalAppointmentsCount : totalAppointments.length,
        totalReviewsCount : totalReviews.length


      });
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
