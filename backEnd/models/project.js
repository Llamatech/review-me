'use strict';

const mongo = require('../db');
const request = require('request');
var assert = require('assert');

var collection = 'projects';

exports.list = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    mongo.find('projects', {}, (docs) =>{
        res.send(JSON.stringify({ projects: docs }));
    });
}

exports.create = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body);
    var project = req.body;

    //Github Processing goes here.

    mongo.insert('projects', project, (doc) => {
        res.send(JSON.stringify({ project: doc }));
    });
}



