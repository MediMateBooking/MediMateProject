const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/doctor/docReviews/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    const currentDoctor = await db
      .DbConn()
      .collection("doctors")
      .find({ userID: userID })
      .toArray();

    if (currentDoctor.length === 0) throw new Error("cannot find User");

    if (!currentDoctor[0].mandotaryFieldFill)
      return res.redirect(`/doctor/profile/${userID}`);

    res.render("Doctor/docReviews", { key: currentDoctor[0] });
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
