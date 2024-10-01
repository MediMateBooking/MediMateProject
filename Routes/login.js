const express = require('express');
const router = express.Router();

const db = require('../database/database');

router.get('/login', (req, res) => {

    try {

        const { token } = req.query;

        if(token && token === req.session.ivalidLinkToken){
            req.session.ivalidLinkToken = null;
            res.render('login', { passwordResetLink: true ,passwordResetLinkMsg : 'Invalid Active Link.'});
        }else{
            res.render('login', { passwordResetLink: false });
        }


    } catch (error) {
        res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
    }


});


module.exports = router;
