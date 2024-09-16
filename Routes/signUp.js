const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

const db = require('../database/database');

router.get('/signup', (req, res) => {

    try {

        res.render('signup');


    } catch (error) {
        res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
    }


});

router.post('/signup', async (req, res) => {

    const { name, email, createPassword } = req.body;
    console.log(name, email, createPassword);


    const newUser = {
        name: name,
        email: email,
        createPassword: createPassword
    };

    try {

        const userResult = await db.DbConn().collection('patients').insertOne(newUser);
        console.log("success");
        res.redirect('/login');

    } catch (error) {
        res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
    }


});

module.exports = router;

