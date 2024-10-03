const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const bcryptjs = require("bcryptjs");
const uuid = require("uuid");

const db = require("../database/database");
const mailer = require("../mail/mailer");

router.get("/signup", (req, res) => {
  try {
    const emailstatus = req.query.passwordNotMatch;

    res.render("signup", { emailstatus: emailstatus });
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

router.post('/signup/doctors', async (req, res) => {

    const { userName, email, slmcregi,role} = req.body;
    console.log(userName, email,slmcregi,role);

    const missingFields = []

    if (userName === '') missingFields.push('User Name');
    if (email === '') missingFields.push('Email Address');
    if (slmcregi === '') missingFields.push('SLMC Registration Number');

    if(missingFields.length > 1){
        return res.json({ success: false, message: 'Please fill all Fields' });
    }

    if(missingFields.length === 1){
        return res.json({ success: false, message: `${missingFields[0]} is required` });
    }
 
    const existingUserEmail = await Promise.any([
        db.DbConn().collection('patients').findOne({ email: email }),
        db.DbConn().collection('doctors').findOne({ email: email })
      ]);

    if(existingUserEmail){

        return res.json({ success: false, message: email+' is already used' });
    }

    let userIdURL = uuid.v4();

    const newUser = {
        name: userName,
        email: email,
        userID : userIdURL,
        slmcregi:slmcregi,
        role:role,
        profileActive : false,
        prifileApprove : false
    };

    try {

        const userResult = await db.DbConn().collection('doctors').insertOne(newUser);
        console.log('Successfully Saved');
        res.json({ success: true, message: 'Your Account sent for Approving. We will let you know after process is completed.'  })
        
    } catch (error) {
        console.error("Server Error:", error);
        res.json({ success: false, message: 'Server Error' });
    }

});


router.post('/signup/patients', async (req, res) => {


    const { userName, email, password ,confirmPassword, role} = req.body;
    console.log(userName, email, password,confirmPassword,role);

    const missingFields = []

    if (userName === '') missingFields.push('User Name');
    if (email === '') missingFields.push('Email Address');
    if (password === '') missingFields.push('Password');
    if (confirmPassword === '') missingFields.push('Confirm password');

    if(missingFields.length > 1){
        return res.json({ success: false, message: 'Please fill all Fields' });
    }

    if(missingFields.length === 1){
        return res.json({ success: false, message: `${missingFields[0]} is required` });
    }
    
    if(password.length < 6){
        return res.json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    if(password !== confirmPassword){
        return res.json({ success: false, message: 'Confirm Password Not Matched' });
    }

     const existingUserEmail = await Promise.any([
        db.DbConn().collection('patients').findOne({ email: email }),
        db.DbConn().collection('doctors').findOne({ email: email })
      ]);
      
    if(existingUserEmail){

        return res.json({ success: false, message: email+' is already used' });
    }
  }
});

module.exports = router;
