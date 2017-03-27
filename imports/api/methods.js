import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import axios from 'axios';


Meteor.methods({
	"github.search"(githubUrl) {
    var url = require('url-parse');

    var urlObj = url(githubUrl, true);
    var path = urlObj.pathname;
    console.log(path);
    var routes = path.split('/');
    var owner = routes[1];
    var repo = routes[2];
    var apiEndpoint = 'https://api.github.com/repos/';
    var apiUrl = apiEndpoint+owner+"/"+repo;
    console.log(apiUrl);
    var config = {
      headers: {
          'User-Agent': 'request'
      }
    };

    var a = axios.get(apiUrl,config)

    // .then(response=>{
    //   console.log("giiit");
    //   console.log(response)
    // }).catch(function (error) {
    //   console.log("que putitas");
    //   console.log(error);
    // });


    return a;
    // console.log(a);

	}
});



    //
    // //Github Processing goes here.
    // var apiEndpoint = 'https://api.github.com/repos/';
    // var apiUrl = urljoin(apiEndpoint, owner, repo);
    // console.log(apiUrl);
    //
    // var options = {
    //     url: apiUrl,
    //     headers: {
    //         'User-Agent': 'request'
    //     }
    // };
    // request.get(options, (error, resp, body) => {
    //     // Body should comply with the JSON form present on docs/repo.json
    //     if(error) throw error;
    //     body = JSON.parse(body);
    //     // console.log(body);
    //     if(resp.statusCode !== 200) {
    //         res.status(resp.statusCode).send();
    //     }
    //     else {
    //         var owner = body.owner;
    //         project.id = body.id;
    //         project.name = body.name;
    //         project.owner = owner.login;
    //         project.summary = body.description;
    //         project.webpage = body.homepage;
    //         project.repo = {
    //             url: body.html_url,
    //             fork: body.fork
    //         };
    //         var info = body;
    //         project.parent_repo = "";
    //         if(body.fork) {
    //             info = body.parent;
    //             project.parent_repo = body.parent.owner.html_url;
    //         }
    //         project.repo.watchers = info.watchers_count;
    //         project.repo.forks = info.forks_count;
    //         project.repo.stars = info.stargazers_count;
    //         project.repo.language = info.language;
    //         project.repo.issues = info.open_issues;
    //         project.comments = []
    //
    //         console.log(project);
    //         mongo.insert('projects', project, (doc) => {
    //             res.send(JSON.stringify({ project: doc }));
    //         });
    //     }
    // });
