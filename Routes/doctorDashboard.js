const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const db = require('../database/database');

router.get('/user/:id', async(req, res) => {

    try {

        const userID = req.params.id;
        const user = await db.DbConn().collection('patients').findOne({
            userID: userID,
            linkExpire: { $gt: Date.now() }
            });

            if(!user){

                const ivalidLinkToken = crypto.randomBytes(32).toString('hex');
                req.session.ivalidLinkToken = ivalidLinkToken;
                return res.redirect(`/login?token=${ivalidLinkToken}`)  
            }

        res.render('doctorDashboard');


    } catch (error) {
        res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
    }


});

module.exports = router;


