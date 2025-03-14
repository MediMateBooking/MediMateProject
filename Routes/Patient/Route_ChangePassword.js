const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const db = require("../../database/database");

router.get("/patient/changePassword/:id", async (req, res) => {
  try {
    const userID = req.params.id;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .find({ userID: userID })
      .toArray();

    if (currentPatient.length === 0) throw new Error("cannot find User");

    let DOB = false;
    let address = false;

    if (currentPatient[0].personalDetails.DOB === "") DOB = false;
    else DOB = true;

    if (currentPatient[0].address.addressFull === "") address = false;
    else address = true;

    res.render("Patient/changePassword", {
      currentPatient: currentPatient,
      DOB: DOB,
      address: address,
    }); //render the patientDashboard.ejs file. render keyword is used to render the ejs file
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

router.post("/patient/password/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .findOne({ userID: userID });

    if (!currentPatient) throw new Error("cannot find User");

    if (
      req.body.newPassword.trim().length < 6 ||
      req.body.confirmPassword.trim().length < 6
    )
      return res.json({
        success: false,
        message: "Password need at least 6 Charactors",
      });
    if (req.body.newPassword.trim() !== req.body.confirmPassword.trim())
      return res.json({
        success: false,
        message: "Confirm Password does not Match",
      });

    const hashedpass = await bcryptjs.hash(req.body.newPassword.trim(), 12);

    await db
      .DbConn()
      .collection("patients")
      .updateOne({ userID: userID }, { $set: { password: hashedpass } });

    res.json({ success: true, message: "Paasword Updated Successfully" });
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;
