const mongoose = require('mongoose');

const config = require('../config/db');

const linkSchema = mongoose.Schema({
    link: {
        type: String,
        required: true,
        unique: true
    },
    converLink: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required: true
    }
});

const links = module.exports = mongoose.model('links', linkSchema);

module.exports.getLinkByLink = function(link, callback) {
    const query = { link: link };
    links.findOne(query).then(link => callback(link));
};

module.exports.getLinkByConvert = function(convert, callback) {
    const query = { converLink: convert };
    links.findOne(query).then(link => callback(link));
};

module.exports.getLinskByOwner = function(userId, callback) {
    const query = { owner: userId };
    links.find(query).then(links => callback(links));
};

module.exports.addLink = (newLink, callback) => {
    newLink.save().then(link => callback(link));
}