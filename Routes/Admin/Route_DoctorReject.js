const express = require("express");
const router = express.Router();
const db = require("../../database/database");
const mailer = require("../../mail/mailer");

router.post("/admin/doctors/reject/:docID", async (req, res) => {
  try {
    const docID = req.params.docID;

    // Fetch doctor details
    const currentDoctor = await db
      .DbConn()
      .collection("doctors")
      .findOne({ userID: docID });

    if (!currentDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update doctor status
    await db
      .DbConn()
      .collection("doctors")
      .updateOne({ userID: docID }, { $set: { rejected: true } });

    // Send rejection email
    mailer.emailFuntion
      .doctorAccoutReject(currentDoctor.email)
      .then(() => console.log("Rejection email sent"))
      .catch((err) => console.error("Error sending rejection email:", err));

    // Respond to client
    res.json({ message: `${currentDoctor.name} User Account Rejected` });
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
