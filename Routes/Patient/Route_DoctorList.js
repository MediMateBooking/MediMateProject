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

    let DOB = false;
    let address = false;

    if (currentPatient[0].personalDetails.DOB === "") DOB = false;
    else DOB = true;

    if (currentPatient[0].address.addressFull === "") address = false;
    else address = true;

    res.render("Patient/doctorList", {
      currentPatient: currentPatient,
      DOB: DOB,
      address: address,
    });
  } catch (error) {
    res.render("common/500");
  }
});

router.post("/patient/approveDocList/:id", async (req, res) => {
  try {
    const userID = req.params.id;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .findOne({ userID: userID });

    if (!currentPatient) throw new Error("cannot find User");

    const activeDoctorsList = await db
      .DbConn()
      .collection("doctors")
      .find({
        profileApprove: true,
        rejected: false,
        mandotaryFieldFill: true,
        emailValid: true,
      })
      .toArray();

    res.json({
      activeDoctorsList: activeDoctorsList,
      savedList: currentPatient.saved,
    });
  } catch (error) {
    res.render("common/500");
  }
});

router.post("/patient/add/saved/:saveid/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const saveID = req.params.saveid;

    const currentPatient = await db
      .DbConn()
      .collection("patients")
      .findOne({ userID: userID });

    if (!currentPatient) throw new Error("cannot find User");

    if (currentPatient.saved.includes(saveID)) {
      await db
        .DbConn()
        .collection("patients")
        .updateOne({ userID: userID }, { $pull: { saved: saveID } });

      res.json({ status: false });
    } else {
      await db
        .DbConn()
        .collection("patients")
        .updateOne({ userID: userID }, { $push: { saved: saveID } });

      res.json({ status: true });
    }
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
