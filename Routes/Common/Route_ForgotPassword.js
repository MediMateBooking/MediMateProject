const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/forgotPassword", (req, res) => {
  try {
    res.render("forgotPassword");
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
