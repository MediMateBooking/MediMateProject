const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const db = require("../../database/database");
const dateFormate = require('../../Extra/Date')

router.get("/patient/book/:id", async (req, res) => {
  try {
  
    const userID = req.params.id;
    const docID = req.query.docID

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
      .toArray();

    if (currentPatient.length === 0) throw new Error("cannot find User");
    if (currentDoctor.length === 0) throw new Error("cannot find Doctor");

    let DOB = false
    let address = false

    if(currentPatient[0].personalDetails.DOB === '') DOB = false
    else DOB = true 

    if(currentPatient[0].address.addressFull === '') address = false
    else address = true 

    res.render("Patient/bookingDoctor", { currentPatient: currentPatient, currentDoctor: currentDoctor, totalReviews : allReviews.length}); //render the patientDashboard.ejs file. render keyword is used to render the ejs file
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});


router.post("/patient/appoitment/:userID/:docID", async (req, res) => {
    try {

        const today = new Date();

       const userID = req.params.userID;
       const docID = req.params.docID;

       const { date, time} = req.body

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

            const appoitmentID = crypto.randomBytes(32).toString("hex")

            const newAppointment = {

                appoitmentID : appoitmentID,
                docID : currentDoctor.userID,
                patinetID : currentPatient.userID,
                appoitmentDate : date,
                appoitmentTime : time,
                status : 'Pending',
                patientName : currentPatient.name,
                patinetDP : currentPatient.profilePicture,
                doctorName : currentDoctor.name,
                doctorDP : currentDoctor.profilePicture,
                applyDate : dateFormate.formatDateTime().date,
                applyTime : dateFormate.formatDateTime().time
            }

            const newAppointmentResult = await db
                .DbConn()
                .collection("appointments")
                .insertOne(newAppointment);

              res.json({ success: true, appoitmentID:appoitmentID,message: "Appointment Send" });
    } catch (error) {
      res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
    }
  });

module.exports = router;