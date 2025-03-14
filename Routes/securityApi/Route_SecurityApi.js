// Import Dependencies
const express = require("express");
const router = express.Router();
const crypto = require("crypto"); // crypto module for generating random tokens
const db = require("../../database/database"); 

router.get("/checkpoint/api", async (req, res) => {
  try {
    const { token } = req.query;

    // Checking if the Token Exists in Database
    const [patientAccount, doctorAccount] = await Promise.all([
      db
        .DbConn()
        .collection("patients")
        .findOne({
          accountValidationToken: token,
          linkExpire: { $gt: Date.now() },
        }),
      db
        .DbConn()
        .collection("doctors")
        .findOne({
          emailValidationToken: token,
          linkExpire: { $gt: Date.now() },
        }),
    ]);

    // Handle Invalid or Expired Token
    if (!patientAccount && !doctorAccount) {
      const invalidLinkToken = crypto.randomBytes(32).toString("hex"); // 32 bytes of random data converted to hex
      req.session.invalidLinkToken = invalidLinkToken; // store the token in the session
      return res.redirect(`/login?token=${invalidLinkToken}`); // redirect to login page with the
    }

    // Activate the patient's account
    if (patientAccount) {
      if (patientAccount.profileActive) {
        const alreadyActivated = crypto.randomBytes(32).toString("hex");
        req.session.alreadyActivated = alreadyActivated;
        return res.redirect(`/login?token=${alreadyActivated}`);
      }

      const updateActiveStatus = {
        // update the user's profileActive status to true
        profileActive: true,
      };

      const UpdatedUserActiveStatus = await db
        .DbConn()
        .collection("patients")
        .updateOne(
          { accountValidationToken: token },
          { $set: updateActiveStatus }
        );

      return res.redirect(`/patient/${patientAccount.userID}`);
    }

    // Activate the doctor's account
    if (doctorAccount) {
      console.log("doctorAccount");

      if (doctorAccount.emailValid) {
        const alreadyEmailValidate = crypto.randomBytes(32).toString("hex");
        req.session.alreadyEmailValidate = alreadyEmailValidate;
        return res.redirect(`/login?token=${alreadyEmailValidate}`);
      }

      const updateEmailValidationStatus = {
        emailValid: true,
      };

      const UpdatedUserEmailValidation = await db
        .DbConn()
        .collection("doctors")
        .updateOne(
          { emailValidationToken: token },
          { $set: updateEmailValidationStatus }
        );

      const successEmailValidation = crypto.randomBytes(32).toString("hex");
      req.session.successEmailValidation = successEmailValidation;
      return res.redirect(`/login?token=${successEmailValidation}`);
    }
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;
