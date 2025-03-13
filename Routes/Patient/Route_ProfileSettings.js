const express = require("express");
const router = express.Router();
const multer = require("multer");
const configStatus = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: configStatus });

const db = require("../../database/database");
const ageCount = require("../../Extra/AgeCount");

router.get("/patient/profile/:id", async (req, res) => {
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

    res.render("Patient/profileSettings", {
      currentPatient: currentPatient,
      DOB: DOB,
      address: address,
    }); //render the patientDashboard.ejs file. render keyword is used to render the ejs file
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

router.post(
  "/patient/profile/:userID",
  upload.single("image"),
  async (req, res) => {
    try {
      const userID = req.params.userID;

      const {
        fullName,
        gender,
        dob,
        bloodGrp,
        phoneNumber,
        height,
        weight,
        bloodPressure,
        fullAddress,
        city,
        state,
        zipcode,
        country,
      } = req.body;
      const fileUpload = req.file;

      const personalDetails = {
        phoneNumber: phoneNumber.trim(),
        gender: gender,
        DOB: dob,
        height: height.trim(),
        weight: weight.trim(),
        bloodPressure: bloodPressure,
        bloodGrp: bloodGrp,
      };

      if (dob !== "") personalDetails.Age = ageCount.calculateYearsSince(dob);

      const address = {
        addressFull: fullAddress.trim(),
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        zipcode: zipcode.trim(),
      };

      if (fileUpload) {
        await db
          .DbConn()
          .collection("patients")
          .updateOne(
            { userID: userID },
            { $set: { profilePicture: fileUpload.path } }
          );
      }

      await db
        .DbConn()
        .collection("patients")
        .updateOne(
          { userID: userID },
          {
            $set: {
              name: fullName.trim(),
              personalDetails: personalDetails,
              address: address,
            },
          }
        );

      res.redirect(`/patient/${userID}`);
    } catch (error) {
      res.render("common/500");
    }
  }
);

module.exports = router;
