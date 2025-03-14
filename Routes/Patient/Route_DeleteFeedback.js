const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId

const db = require("../../database/database");

router.post("/patient/feedback/delete/:feedid", async (req, res) => {
  try {
   const feedid = req.params.feedid;

   console.log(new ObjectId(feedid))

     const allAppointments = await db
         .DbConn()
         .collection("feedback")
         .deleteOne({ _id: new ObjectId(feedid)});

   res.json({status : true});

  } catch (error) {
    res.render("common/500",{error:error});
  }
});

module.exports = router;