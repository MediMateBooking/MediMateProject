const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/patient/view/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const docID = req.query.docID;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .find({ userID: userID })
      .toArray();

    const currentDoctor = await db
      .DbConn()
      .collection("doctors")
      .find({ userID: docID })
      .toArray();

    const allReviews = await db
      .DbConn()
      .collection("reviews")
      .find({ docID: docID })
      .sort({ onTime: -1 })
      .toArray();

    if (currentPatient.length === 0) throw new Error("cannot find User");
    if (currentDoctor.length === 0) throw new Error("cannot find Doctor");

    let DOB = false;
    let address = false;

    if (currentPatient[0].personalDetails.DOB === "") DOB = false;
    else DOB = true;

    if (currentPatient[0].address.addressFull === "") address = false;
    else address = true;

    res.render("Patient/patientToDocProfile", {
      currentPatient: currentPatient,
      currentDoctor: currentDoctor,
      allReviews: allReviews,
      totalReviews: allReviews.length,
      DOB: DOB,
      address: address,
    }); //render the patientDashboard.ejs file. render keyword is used to render the ejs file
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

router.post("/patient/review/:userID/:docID", async (req, res) => {
  try {
    const today = new Date();

    const userID = req.params.userID;
    const docID = req.params.docID;

    const { title, comment } = req.body;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .findOne({ userID: userID });

    const currentDoctor = await db
      .DbConn()
      .collection("doctors")
      .findOne({ userID: docID });

    if (!currentPatient) throw new Error("cannot find User");
    if (!currentDoctor) throw new Error("cannot find Doctor");

    const addComment = {
      docID: currentDoctor.userID,
      patientID: currentPatient.userID,
      title: title,
      comment: comment,
      authorname: currentPatient.name,
      authorProfilePicture: currentPatient.profilePicture,
      doctorname: currentDoctor.name,
      doctorProfilePicture: currentDoctor.profilePicture,
      doctorSpecialization: currentDoctor.specialization.specialist,
      date: today.toDateString(),
      onTime: Date.now(),
    };

    const newComment = await db
      .DbConn()
      .collection("reviews")
      .insertOne(addComment);

    const allReviews = await db
      .DbConn()
      .collection("reviews")
      .find({ docID: docID })
      .sort({ onTime: -1 })
      .toArray();

    res.json({
      success: true,
      allReviews: allReviews,
      message: "Comment sent",
    });
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;
