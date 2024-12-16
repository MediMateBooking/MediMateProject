const express = require("express");
const router = express.Router();

const db = require("../../database/database");
router.get("/admin/reviews/:id", async(req, res) => {
  try {

    const dynamicRouteCode = req.params.id;
    
        const activeAdmin = await db
          .DbConn()
          .collection("admin")
          .find({ dynamicRouteCode: dynamicRouteCode })
          .toArray();

    if (activeAdmin.length === 0) throw new Error("cannot find Admin");

    res.render("Admin/reviews",{activeAdmin : activeAdmin});
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});


module.exports = router;