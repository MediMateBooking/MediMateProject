const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/patientList", (req, res) => {
  try {
    res.render("Doctor/patientList");
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
