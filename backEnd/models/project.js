'use strict';

const mongo = require('../db');
const request = require('request');
var assert = require('assert');
var urljoin = require('url-join');

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

    // See docs/project.json to see example body
    var project = req.body;

    // Expected: https://github.com/owner/repo
    var githubUrl = project.url;
    var urlObj = url.parse(githubUrl, false, true);
    var path = url_obj.pathname;
    var routes = path.split('/');
    var owner = routes[0];
    var repo = routes[1];

    //Github Processing goes here.
    var apiEndpoint = 'https://api.github.com/repos/';
    var apiUrl = urljoin(apiEndpoint, owner, repo);
    request.get(apiUrl, (error, resp, body) => {
        // Body should comply with the JSON form present on docs/repo.json
        if(err) throw err;
        if(resp.statusCode !== 200) {
            res.status(resp.statusCode).send();
        }
        else {
            mongo.insert('projects', project, (doc) => {
                res.send(JSON.stringify({ project: doc }));
            });
        }
    });

}





