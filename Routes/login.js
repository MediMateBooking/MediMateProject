const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const router = express.Router();

const db = require('../database/database');

router.get('/login', (req, res) => {

    try {
        const { token } = req.query;

        if(token && token === req.session.ivalidLinkToken){
            req.session.ivalidLinkToken = null;
            res.render('login', { validation: true ,validationMsg : 'Invalid Active Link.'});
        }else if(token && token === req.session.alreadyActived){
            req.session.alreadyActived = null;
            res.render('login', { validation: true ,validationMsg : 'Your Accout already Actived, Please Login'});
        }else if(token && token === req.session.notExitsUser){
            req.session.notExitsUser = null;
            res.render('login', { validation: true ,validationMsg : 'Cannot Find User.'});
        }else if(token && token === req.session.incorrectPassword){
            req.session.incorrectPassword = null;
            res.render('login', { validation: true ,validationMsg : 'Incorrect Password.'});
        }else if(token && token === req.session.profileActive){
            req.session.profileActive = null;
            res.render('login', { validation: true ,validationMsg : 'Your Account is not Actived.'});
        }
        else{
            res.render('login', { validation: false });
        }
    } catch (error) {
        res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
    }
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Promise.any([
      db.DbConn().collection("patients").findOne({ email: email }),
      db.DbConn().collection("doctors").findOne({ email: email }),
    ]);

    if (!existingUser) {
      const notExitsUser = crypto.randomBytes(32).toString("hex");
      req.session.notExitsUser = notExitsUser;
      return res.redirect(`/login?token=${notExitsUser}`);
    }

    const passEqual = await bcryptjs.compare(password, existingUser.password);
    if (!passEqual) {
      const incorrectPassword = crypto.randomBytes(32).toString("hex");
      req.session.incorrectPassword = incorrectPassword;
      return res.redirect(`/login?token=${incorrectPassword}`);
    }

    if (!existingUser.profileActive) {
      const profileActive = crypto.randomBytes(32).toString("hex");
      req.session.profileActive = profileActive;
      return res.redirect(`/login?token=${profileActive}`);
    }

    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
