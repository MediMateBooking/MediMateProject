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

    if (currentPatient.length === 0) throw new Error("cannot find User");

    let DOB = false
    let address = false

    if(currentPatient[0].personalDetails.DOB === '') DOB = false
    else DOB = true 

    if(currentPatient[0].address.addressFull === '') address = false
    else address = true 

    res.render("Patient/systemFeedbacks", { currentPatient: currentPatient, currentDoctor: "", allReviews: "",totalReviews : "",DOB : DOB, address:address}); //render the patientDashboard.ejs file. render keyword is used to render the ejs file
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;

