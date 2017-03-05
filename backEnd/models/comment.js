'use strict';

const mongo = require('../db');
var collection = 'comments';

exports.comment = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    mongo.insert('comments', req.body, (doc) => {
        mongo.find('comments', {'project': req.body.project}, (docs) => {
            res.send(JSON.stringify(docs));
        })
    });
}