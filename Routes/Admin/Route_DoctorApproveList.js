const express = require("express");
const router = express.Router();

const db = require("../../database/database");
router.get("/admin/doctors/:id", async(req, res) => {
  try {

    const dynamicRouteCode = req.params.id;
    
        const activeAdmin = await db
          .DbConn()
          .collection("admin")
          .find({ dynamicRouteCode: dynamicRouteCode })
          .toArray();

    if (activeAdmin.length === 0) throw new Error("cannot find Admin");

    res.render("Admin/docApprovel",{activeAdmin : activeAdmin});
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});


router.post("/doctors/approvelist", async(req, res) => {
  try {

    const approveDoctorList = await db
    .DbConn()
    .collection("doctors")
    .find({ profileApprove: false })
    .toArray();

    res.json({approveDoctorList: approveDoctorList});
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});




module.exports = router;
