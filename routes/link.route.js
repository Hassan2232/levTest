const express = require('express');
const config = require('../config/db');

const Link = require('../models/link');

const router = express.Router();

router.get('/', (req, res) => {
    const { userId } = req.query;

    Link.getLinskByOwner(userId, (links) => {
        res.status(200).json({success: true, links: links});
    });
});

router.get('/redirect', (req, res) => {
    const { convert } = req.query;

    Link.getLinkByConvert(convert, (link) => {
        res.status(200).json({success: true, link: link});
    });
});

router.post('/convert', (req, res) => {
    const resLink = req.body.link;
    const userId = req.body.userId;

    if(!resLink) {
        return res.status(400).json({success: false, msg: 'incorrect data'})
    }

    Link.getLinkByLink(resLink, (link) => {
        if(link) {
            return res.status(300).json({success: false, msg: 'link used'});
        }

        makeConvert = () => {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
            for (let i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            
            return text;
        }

        let newLink = new Link({
            link: resLink,
            converLink: makeConvert(),
            owner: userId
        });

        Link.addLink(newLink, (link) => {
            if(!link) {
                res.status(500).json({
                    success: false,
                    msg: 'link has not been convert'
                });
            } else {
                res.status(201).json({
                    success: false,
                    msg: 'link has been convert',
                    link: link
                });
            }
        });
    });
});

module.exports = router;