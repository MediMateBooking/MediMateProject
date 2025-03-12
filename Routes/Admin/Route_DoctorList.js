const express = require("express");
const router = express.Router();

const db = require("../../database/database");
router.get("/admin/doctorList/:id", async (req, res) => {
  try {
    const dynamicRouteCode = req.params.id;

    const activeAdmin = await db
      .DbConn()
      .collection("admin")
      .find({ dynamicRouteCode: dynamicRouteCode })
      .toArray();

    if (activeAdmin.length === 0) throw new Error("cannot find Admin");

    res.render("Admin/doctorList", { activeAdmin: activeAdmin });
  } catch (error) {
    res.render("common/500");
  }
});

module.exports = router;
