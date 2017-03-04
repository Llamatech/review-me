'use strict';

const mongo = require('../db');
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const collection = 'projects';
var mongo_url = mongo.database('review-me');
console.log(mongo_url)

var findDocuments = (db, callback) => {
    // Get the documents collection
    var collection = db.collection('projects');
    // Find some documents
    collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });
}

exports.get = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    MongoClient.connect(mongo_url, (err, db) => {
        console.log("Connected successfully to server!");
        findDocuments(db, (docs) => {
            res.send(JSON.stringify({ tweets: docs }));
            db.close();
        });
    });
}
