const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const db = require("../database/database");

router.get("/user/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await db
      .DbConn()
      .collection("patients")
      .findOne({
        userID: userID,
        linkExpire: { $gt: Date.now() },
      });

    if (!user) {
      // if the user is not found
      const ivalidLinkToken = crypto.randomBytes(32).toString("hex"); // 32 bytes of random data converted to hex
      req.session.ivalidLinkToken = ivalidLinkToken; // store the token in the session
      return res.redirect(`/login?token=${ivalidLinkToken}`); // redirect to login page with the token
    }

    if (user.profileActive) {
      // if the user is already activated
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
      .updateOne({ userID: userID }, { $set: updateActiveStatus });

    res.render("doctorDashboard");
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
