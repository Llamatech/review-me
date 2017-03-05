'use strict';

const mongo = require('../db');
const request = require('request');
var assert = require('assert');
var urljoin = require('url-join');
var url = require('url');
var sha3 = require('sha3');
var async = require('async');

var collection = 'projects';


exports.list = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var query = [];
    if(id) query.push({$match: {"id": id}});
    query.push(
        {
            $lookup: {
                from: "ratings",
                localField: "id",
                foreignField: "id",
                as: "ratings"
            }
        }
    );
    query.push({
        $lookup: {
            from: "comments",
            localField: "id",
            foreignField: "project",
            as: "comments"
        }
    });
    mongo.aggregate('projects', query, (docs) => {
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
            var info = body;
            project.parent_repo = "";
            if(body.fork) {
                info = body.parent;
                project.parent_repo = body.parent.owner.html_url;
            }
            project.repo.watchers = info.watchers_count;
            project.repo.forks = info.forks_count;
            project.repo.stargazers = info.stargazers_count;
            project.repo.language = info.language;
            project.repo.issues = info.open_issues;

            console.log(project);
            mongo.insert('projects', project, (doc) => {
                res.send(JSON.stringify({ project: doc }));
            });
        }
    });

}





