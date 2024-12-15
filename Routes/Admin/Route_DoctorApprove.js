const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const db = require("../../database/database");
const mailer = require("../../mail/mailer");
const randomPassword = require('../../Extra/RandomPassword');


router.post("/admin/doctors/approve/:docID", async(req, res) => {
  try {

    const docID = req.params.docID;
    const hashedpass = await bcryptjs.hash(randomPassword.generateRandomPassword(), 12);

    const currentDoctor = await db
          .DbConn()
          .collection("doctors")
          .findOne({ userID: docID })
    
        const activeDoctor = await db
          .DbConn()
          .collection("doctors")
          .updateOne({ userID: docID } , {$set : {profileApprove : true , password : hashedpass}})

          await mailer.emailFuntion.doctorAccoutApprove(currentDoctor.email, currentDoctor.name, randomPassword.generateRandomPassword());


    res.json({ message : `Dr.${currentDoctor.name} Account Approved` });
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
