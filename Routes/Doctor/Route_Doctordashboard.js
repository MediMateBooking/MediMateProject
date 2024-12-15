const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const db = require("../../database/database");

router.get("/doctorDashboard", async (req, res) => {
  try {
    // const userID = req.params.id;

    res.render("doctorDashboard");
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
