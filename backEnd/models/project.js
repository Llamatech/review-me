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
    var search_term = req.query.term;
    console.log(search_term);
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
    query.push({
        $addFields: {
            ratings: "$ratings.avgRating"
        }
    });

    if(search_term)
    {
        // search_term = search_term.toLowerCase();
        query.push({
            $match: {
                $or: [
                    {name:{'$regex':'\X*'+search_term+'\X*'}},
                    {summary:{'$regex':'\X*'+search_term+'\X*'}},
                    {owner:{'$regex':'\X*'+search_term+'\X*'}}
                ]
            }
        });
    }

    var stars = (req.query.stars !== undefined && req.query.stars !== '') ? parseFloat(req.query.stars) : 0
    var forks = (req.query.forks !== undefined && req.query.forks !== '') ? parseFloat(req.query.forks) : 0
    var issues = (req.query.issues !== undefined && req.query.issues !== '') ? parseFloat(req.query.issues) : 0
    var watchers = (req.query.watchers !== undefined && req.query.watchers !== '') ? parseFloat(req.query.watchers) : 0

    query.push({
        $match: {
            $and:[
                    {"repo.stars": {$gte: stars}},
                    {"repo.forks": {$gte: forks}},
                    {"repo.watchers": {$gte: watchers}},
                    {"repo.issues": {$gte: issues}}
            ]
        }
    });

    console.log(query);

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
            project.name = body.name;
            project.owner = owner.login;
            project.summary = body.description;
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
            project.repo.stars = info.stargazers_count;
            project.repo.language = info.language;
            project.repo.issues = info.open_issues;
            project.comments = []

            console.log(project);
            mongo.insert('projects', project, (doc) => {
                res.send(JSON.stringify({ project: doc }));
            });
        }
    });

}





