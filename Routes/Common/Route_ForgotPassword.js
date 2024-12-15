const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/forgotPassword", (req, res) => {
  try {
    res.render("forgotPassword");
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
