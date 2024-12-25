const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/patient/favorites/:id", async (req, res) => {
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

    res.render("Patient/favorites",{ currentPatient: currentPatient, DOB : DOB, address:address});
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});



router.post("/patient/favourite/:id", async(req, res) => {
  try {

    
    const userID = req.params.id;
    
        const currentPatient = await db
          .DbConn()
          .collection("patients")
          .findOne({ userID: userID });
    
        if (!currentPatient) throw new Error("cannot find User");

        const savedDoctorsRecords = [];

        for (const oneSavedRecord of currentPatient.saved) {
            const relatedRecord = await db.DbConn().collection('doctors').findOne({ userID: oneSavedRecord });
        
            if (savedDoctorsRecords) {
              savedDoctorsRecords.push({
                    ...relatedRecord 
                });
            }
        }

    res.json({ status : true ,savedDoctorsRecords : savedDoctorsRecords});
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});


router.post("/patient/favourite/remove/:saveid/:id", async(req, res) => {
  try {

    const userID = req.params.id;
    const saveID = req.params.saveid;
    
        const currentPatient = await db
          .DbConn()
          .collection("patients")
          .findOne({ userID: userID });
    
        if (!currentPatient) throw new Error("cannot find User");

        if(currentPatient.saved.includes(saveID)){

          await db.DbConn().collection('patients').updateOne(
              { userID: userID },
              { $pull: { saved: saveID } }
          );

          res.json({status: true})
      }

  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;