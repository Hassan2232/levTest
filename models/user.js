const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../config/db');

const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    }
});

const users = module.exports = mongoose.model('users', userSchema);

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;

        bcrypt.hash(newUser.pass, salt, (err, hash) => {
            if(err) throw err;
            newUser.pass = hash;
            newUser.save().then(user => callback(user));
        });
    });
}

module.exports.getUserById = function(id, callback) {
    users.findById(id).then(user => callback(user));
};

module.exports.getUserByLogin = function(login, callback) {
    const query = { login: login };
    users.findOne(query).then(user => callback(user));
};

module.exports.comparePass = function(passFromUser, userDbPass, callback) {
    bcrypt.compare(passFromUser, userDbPass, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};