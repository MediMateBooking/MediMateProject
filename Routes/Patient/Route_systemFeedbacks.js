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

    const allFeedback = await db
      .DbConn()
      .collection("feedback")
      .find()
      .toArray();

    if (currentPatient.length === 0) throw new Error("cannot find User");

    let DOB = false;
    let address = false;

    if (currentPatient[0].personalDetails.DOB === "") DOB = false;
    else DOB = true;

    if (currentPatient[0].address.addressFull === "") address = false;
    else address = true;

    res.render("Patient/systemFeedbacks", {
      currentPatient: currentPatient,
      allFeedback: allFeedback,
      totalReviews: "",
      DOB: DOB,
      address: address,
    }); //render the patientDashboard.ejs file. render keyword is used to render the ejs file
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

router.post("/add/feedback/:userID", async (req, res) => {
  try {
    const today = new Date();
    const userID = req.params.userID;

    const { title, comment } = req.body;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .findOne({ userID: userID });

    if (!currentPatient) throw new Error("cannot find User");

    const newFeedback = {
      reviewID: currentPatient.userID,
      title: title,
      comment: comment,
      authorname: currentPatient.name,
      profilePicture: currentPatient.profilePicture,
      date: today.toDateString(),
    };

    const newFeedbackResult = await db
      .DbConn()
      .collection("feedback")
      .insertOne(newFeedback);

    const allFeedback = await db
      .DbConn()
      .collection("feedback")
      .find()
      .toArray();

    res.json({
      success: true,
      allFeedback: allFeedback,
      message: "Feedback sent",
    });
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;
