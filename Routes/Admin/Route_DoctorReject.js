const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const db = require("../../database/database");
const mailer = require("../../mail/mailer");

router.post("/admin/doctors/reject/:docID", async(req, res) => {
  try {

    const docID = req.params.docID;

    const currentDoctor = await db
          .DbConn()
          .collection("doctors")
          .findOne({ userID: docID })
    
        const activeDoctor = await db
          .DbConn()
          .collection("doctors")
          .updateOne({ userID: docID } , {$set : {rejected : true}})

          await mailer.emailFuntion.doctorAccoutReject(currentDoctor.email);


    res.json({ message : `${currentDoctor.name} User Account Rejected` });
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
