const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const db = require("../../database/database");

router.get("/doctor/docChangePassword/:userID", async (req, res) => {
  try {

     const userID = req.params.userID;
    
        const currentDoctor = await db
              .DbConn()
              .collection("doctors")
              .find({ userID: userID })
              .toArray();
        
            if (currentDoctor.length === 0) throw new Error("cannot find User");
    
            if(!currentDoctor[0].mandotaryFieldFill) return res.redirect(`/doctor/profile/${userID}`);

    res.render("Doctor/docChangePassword" , { currentDoctor: currentDoctor });
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

router.post("/doctor/password/:userID", async (req, res) => {
  try {

     const userID = req.params.userID;

        const currentDoctor = await db
              .DbConn()
              .collection("doctors")
              .find({ userID: userID });
        
            if (!currentDoctor) throw new Error("cannot find User");

            if(req.body.newPassword.trim().length < 6 || req.body.confirmPassword.trim().length < 6) return res.json({ success: false, message: "Password need at least 6 Charactors" });
            if(req.body.newPassword.trim() !== req.body.confirmPassword.trim()) return res.json({ success: false, message: "Confirm Password does not Match" });

             const hashedpass = await bcryptjs.hash(req.body.newPassword.trim(), 12);

              await db
                  .DbConn()
                  .collection("doctors")
                  .updateOne(
                    { userID: userID },
                    { $set: {password: hashedpass}}
                  );

            res.json({ success: true, message: "Paasword Updated Successfully" });
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;