const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/patient/appointment/:id", async (req, res) => {
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
    let emptyActiveList = false

    if(currentPatient[0].personalDetails.DOB === '') DOB = false
    else DOB = true 

    if(currentPatient[0].address.addressFull === '') address = false
    else address = true 

    const activeDoctorsList = await db
    .DbConn()
    .collection("doctors")
    .find({ profileApprove: true, rejected : false, mandotaryFieldFill : true, emailValid : true })
    .toArray();

    if(activeDoctorsList.length === 0) emptyActiveList = true

    res.render("Patient/doctorList",{ currentPatient: currentPatient, activeDoctorsList:activeDoctorsList, DOB : DOB, address:address, emptyActiveList:emptyActiveList});
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
