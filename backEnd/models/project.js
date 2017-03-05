'use strict';

const mongo = require('../db');
const request = require('request');
var assert = require('assert');
var urljoin = require('url-join');
var url = require('url');

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
    var path = urlObj.pathname;
    console.log(path);
    var routes = path.split('/');
    var owner = routes[1];
    var repo = routes[2];

    //Github Processing goes here.
    var apiEndpoint = 'https://api.github.com/repos/';
    var apiUrl = urljoin(apiEndpoint, owner, repo);
    console.log(apiUrl);

    var options = {
        url: apiUrl,
        headers: {
            'User-Agent': 'request'
        }
    };
    request.get(options, (error, resp, body) => {
        // Body should comply with the JSON form present on docs/repo.json
        if(error) throw error;
        body = JSON.parse(body);
        // console.log(body);
        if(resp.statusCode !== 200) {
            res.status(resp.statusCode).send();
        }
        else {
            var owner = body.owner;
            project.id = body.id;
            project.owner = owner.login;
            project.description = body.description;
            project.webpage = body.homepage;
            project.repo = {
                url: body.html_url,
                fork: body.fork
            };
            if(body.fork) {
                project.parent_repo = body.parent.owner.html_url;
                project.repo.watchers = body.parent.watchers_count;
                project.repo.forks = body.parent.forks_count;
                project.repo.stargazers = body.parent.stargazers_count;
                project.repo.language = body.parent.language;
                project.repo.issues = body.parent.open_issues;
            }
            else {
                project.parent_repo = "";
                project.repo.watchers = body.watchers_count;
                project.repo.forks = body.forks_count;
                project.repo.stargazers = body.stargazers_count;
                project.repo.language = body.language;
                project.repo.issues = body.open_issues;
            }
            project.comments = [];
            project.ratings = [];
            project.avgRating = 0;
            console.log(project);
            mongo.insert('projects', project, (doc) => {
                res.send(JSON.stringify({ project: doc }));
            });
        }
    });

}





