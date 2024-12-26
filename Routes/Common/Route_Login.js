const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const router = express.Router();

const db = require("../../database/database");

router.get("/login", (req, res) => {
  try {
    const { token } = req.query;

    if (token && token === req.session.invalidLinkToken) {
      req.session.invalidLinkToken = null;
      res.render("Common/login", {
        validation: true,
        successfulValidation: false,
        validationMsg: "Invalid Validation Link.",
      });
    } else if (token && token === req.session.alreadyEmailValidate) {
      req.session.alreadyEmailValidate = null;
      res.render("Common/login", {
        validation: true,
        successfulValidation: false,
        validationMsg: "Email Address is Already Validated",
      });
    } else if (token && token === req.session.successEmailValidation) {
      req.session.successEmailValidation = null;
      res.render("Common/login", {
        validation: false,
        successfulValidation: true,
        validationMsg1: "Email Successfully Validated",
        validationMsg2:
          "Your Account is under approving process.",
      });
    } else if (token && token === req.session.alreadyActivated) {
      req.session.alreadyActivated = null;
      res.render("Common/login", {
        validation: true,
        successfulValidation: false,
        validationMsg: "Your Account is Already Activated, Please Login",
      });
    } else if (token && token === req.session.notExitsUser) {
      req.session.notExitsUser = null;
      res.render("Common/login", {
        validation: true,
        successfulValidation: false,
        validationMsg: "Cannot Find User Under Entered Email Address. Check Your Email Address Again.",
      });
    } else if (token && token === req.session.incorrectPassword) {
      req.session.incorrectPassword = null;
      res.render("Common/login", {
        validation: true,
        successfulValidation: false,
        validationMsg: "Entered Password is Incorrect.",
      });
    } else if (token && token === req.session.profileActive) {
      req.session.profileActive = null;
      res.render("Common/login", {
        validation: true,
        successfulValidation: false,
        validationMsg: "Your Account is still under approving process.",
      });
    } else {
      res.render("Common/login", { validation: false, successfulValidation: false });
    }
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [patientAccount, doctorAccount, admin] = await Promise.all([
      db.DbConn().collection("patients").findOne({ email: email }),
      db.DbConn().collection("doctors").findOne({ email: email }),
      db.DbConn().collection("admin").findOne({ email: email }),
    ]);

    if (!patientAccount && !doctorAccount && !admin) {
      const notExitsUser = crypto.randomBytes(32).toString("hex");
      req.session.notExitsUser = notExitsUser;
      return res.redirect(`/login?token=${notExitsUser}`);
    }

    if (patientAccount) {
      const passEqual = await bcryptjs.compare(
        password,
        patientAccount.password
      );
      if (!passEqual) {
        const incorrectPassword = crypto.randomBytes(32).toString("hex");
        req.session.incorrectPassword = incorrectPassword;
        return res.redirect(`/login?token=${incorrectPassword}`);
      }

      if (!patientAccount.profileActive) {
        const profileActive = crypto.randomBytes(32).toString("hex");
        req.session.profileActive = profileActive;
        return res.redirect(`/login?token=${profileActive}`);
      }

      return res.redirect(`/patient/${patientAccount.userID}`);
    }

    if (doctorAccount) {
      const passEqual = await bcryptjs.compare(
        password,
        doctorAccount.password
      );
      if (!passEqual) {
        const incorrectPassword = crypto.randomBytes(32).toString("hex");
        req.session.incorrectPassword = incorrectPassword;
        return res.redirect(`/login?token=${incorrectPassword}`);
      }

      return res.redirect(`/doctor/${doctorAccount.userID}`);
    }

    if (admin) {
      const passEqual = admin.password === password;
      if (!passEqual) {
        const incorrectPassword = crypto.randomBytes(32).toString("hex");
        req.session.incorrectPassword = incorrectPassword;
        return res.redirect(`/login?token=${incorrectPassword}`);
      }

      const dynamicRouterCode = crypto.randomBytes(32).toString("hex");
      const updateDynamicRouteCode = {
        dynamicRouteCode: dynamicRouterCode
      }
      const adminResult = await db
        .DbConn()
        .collection("admin")
        .updateOne({ email: email, }, { $set: updateDynamicRouteCode });

      return res.redirect(`/admin/${dynamicRouterCode}`);
    }



  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;


