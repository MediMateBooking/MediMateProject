// const express = require("express");
// const router = express.Router();
// const bcryptjs = require("bcryptjs");

// const db = require("../../database/database");
// const mailer = require("../../mail/mailer");
// const randomPassword = require('../../Extra/RandomPassword');


// router.post("/admin/doctors/approve/:docID", async(req, res) => {
//   try {

//     const docID = req.params.docID;
//     const ranPassword = randomPassword.generateRandomPassword()
//     const hashedpass = await bcryptjs.hash(ranPassword, 12);

//     const currentDoctor = await db
//           .DbConn()
//           .collection("doctors")
//           .findOne({ userID: docID })

//         const activeDoctor = await db
//           .DbConn()
//           .collection("doctors")
//           .updateOne({ userID: docID } , {$set : {profileApprove : true , password : hashedpass}})

//           await mailer.emailFuntion.doctorAccoutApprove(currentDoctor.email, currentDoctor.name, ranPassword);


//     res.json({ message : `Dr.${currentDoctor.name} Account Approved` });
//   } catch (error) {
//     res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const db = require("../../database/database");
const mailer = require("../../mail/mailer");
const randomPassword = require('../../Extra/RandomPassword');

router.post("/admin/doctors/approve/:docID", async (req, res) => {

  try {

    const docID = req.params.docID;
    console.log(`Received request to approve doctor with ID: ${docID}`);

    const ranPassword = randomPassword.generateRandomPassword();
    // console.log("Generated random password for doctor");

    const hashedpass = await bcryptjs.hash(ranPassword, 12);
    // console.log(`Hashed password successfully`);


    const currentDoctor = await db
      .DbConn()
      .collection("doctors")
      .findOne({ userID: docID });

    if (!currentDoctor) {
      console.log(`Doctor with ID: ${docID} not found`);
      return res.status(404).json({ message: "Doctor not found" });
    }

    // console.log(`Doctor details retrieved: ${JSON.stringify(currentDoctor)}`);

    // Update doctor profile status and set password
    await db
      .DbConn()
      .collection("doctors")
      .updateOne(
        { userID: docID },
        { $set: { profileApprove: true, password: hashedpass } }
      );

    // Send approval email (non-blocking)
    mailer.emailFuntion
      .doctorAccoutApprove(currentDoctor.email, currentDoctor.name, ranPassword)
      .then(() => console.log("Approval email sent"))
      .catch((err) => console.error("Error sending approval email:", err));

    // Respond to client
    res.json({ message: `Dr.${currentDoctor.name} Account Approved` });
    console.log(`Approval completed for Doctor ID: ${docID}`);
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
    console.error("Error during approval process", error);
  }
});

module.exports = router;
