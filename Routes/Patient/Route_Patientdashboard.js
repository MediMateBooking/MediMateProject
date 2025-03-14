const express = require("express");
const router = express.Router();

const db = require("../../database/database");
const BMI = require("../../Extra/BMICalculator");

router.get("/patient/:id", async (req, res) => {
  try {
    const userID = req.params.id;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .find({ userID: userID })
      .toArray();

    if (currentPatient.length === 0) throw new Error("cannot find User");

    const totalAppointments = await db
      .DbConn()
      .collection("appointments")
      .find({ patinetID: userID })
      .sort({ onTime: -1 })
      .limit(5)
      .toArray();

      const totalAppointmentsFull = await db
      .DbConn()
      .collection("appointments")
      .find({ patinetID: userID })
      .toArray();

    const totalReviews = await db
      .DbConn()
      .collection("reviews")
      .find({ patientID: userID })
      .sort({ onTime: -1 })
      .limit(4)
      .toArray();

    const totalReviewsCount = await db
      .DbConn()
      .collection("reviews")
      .find({ patientID: userID })
      .toArray();

    const totalFeedbacks = await db
      .DbConn()
      .collection("feedback")
      .find({ reviewID: userID })
      .sort({ onTime: -1 })
      .limit(4)
      .toArray();

    const totalDoctors = await db
      .DbConn()
      .collection("doctors")
      .find()
      .toArray();

    let DOB = false;
    let address = false;
    let bloodPressure = false;
    let bmi = false;
    let userBMI;

    if (currentPatient[0].personalDetails.DOB === "") DOB = false;
    else DOB = true;

    if (currentPatient[0].address.addressFull === "") address = false;
    else address = true;

    if (currentPatient[0].personalDetails.bloodPressure === "")
      bloodPressure = false;
    else bloodPressure = true;

    if (
      currentPatient[0].personalDetails.height !== "" &&
      currentPatient[0].personalDetails.weight !== ""
    ) {
      bmi = true;
      userBMI = BMI.BMICalculator(
        currentPatient[0].personalDetails.height,
        currentPatient[0].personalDetails.weight
      );
    } else bmi = false;

    res.render("Patient/patientDashboard", {
      currentPatient: currentPatient,
      DOB: DOB,
      address: address,
      bloodPressure: bloodPressure,
      bmi: bmi,
      userBMI: userBMI,
      totalAppointments: totalAppointments,
      totalAppointmentsCount: totalAppointmentsFull.length,
      totalReviewsList: totalReviews,
      totalReviews: totalReviewsCount.length,
      totalFeedbacks: totalFeedbacks,
      totalDoctors: totalDoctors.length,
    }); //render the patientDashboard.ejs file. render keyword is used to render the ejs file
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;
