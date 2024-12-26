const express = require("express");
const router = express.Router();
const multer = require('multer');
const configStatus = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'images')
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+'-'+ file.originalname)
    }
})

const upload  = multer({storage:configStatus });

const db = require("../../database/database");

router.get("/doctor/docProfileSettings/:userID", async (req, res) => {
  try {
    
    const userID = req.params.userID;

    const currentDoctor = await db
          .DbConn()
          .collection("doctors")
          .find({ userID: userID })
          .toArray();
    
        if (currentDoctor.length === 0) throw new Error("cannot find User");

    res.render("Doctor/docProfileSettings", { currentDoctor: currentDoctor });
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

router.post("/doctor/profile/:userID", upload.single('image'),async (req, res) => {
  try {
    
    const userID = req.params.userID;

      const {
        firstName,
        lastName,
        phoneNumber,
        gender,
        dob,
        bio,
        adressLine1,
        adressLine2,
        city,
        province,
        country,
        postalCode,
        specialist,
        degree,
        institute,
        startYear,
        endYear,
        hospitalName,
        from,
        to,
        designation,
        date1,
        time1,
        date2,
        time2,
        date3,
        time3} = req.body
      const fileUpload = req.file;

      const personalDetails ={

        firstName : firstName.trim(),
        lastName : lastName.trim(),
        phoneNumber : phoneNumber.trim(),
        gender : gender,
        DOB : dob,
        bio : bio.trim()
      }

      const address = {
        adressLine1 : adressLine1.trim(),
        adressLine2 : adressLine2.trim(),
        city : city.trim(),
        province : province.trim(),
        country: country.trim(),
        postalCode : postalCode.trim()
      }

      const specialization = {
        specialist : specialist.trim()
      }

      const education = {
        degree : degree.trim(),
        institute : institute.trim(),
        startYear : startYear.trim(),
        endYear : endYear.trim()
      }

      const experience = {
        hospitalName : hospitalName.trim(),
        from : from.trim(),
        to : to.trim(),
        designation : designation.trim()
      }

      const available = [
        {id : 1, date : date1, time : time1},
        {id : 2,date : date2, time : time2},
        {id : 3,date : date3, time : time3}
      ]

      if(fileUpload){
        await db
        .DbConn()
        .collection("doctors")
        .updateOne(
          { userID: userID },
          { $set: { profilePicture: fileUpload.path}}
        )
      }

      await db
      .DbConn()
      .collection("doctors")
      .updateOne(
        { userID: userID },
        { $set: {name: `${firstName.trim()} ${lastName.trim()}`, personalDetails : personalDetails,address:address,specialization:specialization,education:education,experience:experience,available:available,mandotaryFieldFill:true}}
      );

    res.redirect(`/doctor/${userID}`);
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
