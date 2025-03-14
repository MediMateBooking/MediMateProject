const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/docToPatientProfile", (req, res) => {
  try {
    res.render("Doctor/docToPatientProfile");
  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;
