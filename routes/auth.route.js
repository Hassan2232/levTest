const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const User = require('../models/user');

const router = express.Router();

router.post('/registration', (req, res) => {
    if(!req.body.login || !req.body.pass) {
        return res.status(400).json({success: false, msg: 'incorrect data'})
    }

    let newUser = new User({
        login: req.body.login,
        pass: req.body.pass
    });

    User.getUserByLogin(newUser.login, (user) => {
        if(user) {
            return res.status(300).json({success: false, msg: 'login used by another user'});
        }

        User.addUser(newUser, (user) => {
            if(!user) {
                res.status(500).json({
                    success: false,
                    msg: 'user has not been added'
                });
            } else {
                res.status(201).json({
                    success: true,
                    msg: 'user has been aded'
                });
            }
    
        });
    });
});

router.post('/login', (req, res) => {
    const login = req.body.login;
    const pass = req.body.pass;

    User.getUserByLogin(login, (user) => {
        if(!user) {
            return res.status(400).json({ success: false, msg: 'user not found' });
        };

        User.comparePass(pass, user.pass, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    //Создать токен на 8 часов:
                    // expiresIn: 3600 * 8
                    //Создать токен на 1 минуту:
                    expiresIn: 60 * 20
                });
                return res.status(200).json({ 
                    success: true, 
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        login: user.login,
                        role: user.role
                    }
                });
            } else {
                return res.status(400).json({ success: false, msg: 'password mismatch' });
            }
        })
    });
});

// router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
//     res.send("Страница аккаунта")
// });

module.exports = router;