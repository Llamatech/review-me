/* global JobCollection, Modules, Job, GlobalProjects, HTTP */

let startjobs = () => {
    var myJobs = JobCollection('github-extract');
    myJobs.startJobServer();
    // let i = 0;
    myJobs.processJobs('update-project', {
        concurrency: 1,
        payload: 100,
        pollInterval: 1000*15*60,
        prefetch: 100
    },
    (jobs, cb) => {
        // console.log("This should be called periodically: " + i);
        // i++;
        // GlobalProjects = new Mongo.Collection('projects');
        var projects = GlobalProjects.find({}).fetch();
        var apiEndpoint = 'https://api.github.com/repos/';
        for(var j = 0; j < projects.length; j++)
        {
            let project = projects[j];
            var url = apiEndpoint + project.owner + '/' + project.name;
            // console.log(url);
            HTTP.get(url, {'headers':{'User-Agent':'request'}}, (err, resp) => {
                if(err) {
                    // console.error("Error!");
                    // console.log(err);
                }
                else
                {
                    // console.log(resp);
                    var body = resp.data;
                    var info = body;
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
                    // var project = {}
                    project.parent_repo = '';
                    if(body.fork) {
                        info = body.parent;
                        project.parent_repo = body.parent.owner.html_url;
                    }
                    project.repo.watchers = info.watchers_count;
                    project.repo.forks = info.forks_count;
                    project.repo.stars = info.stargazers_count;
                    project.repo.language = info.language;
                    project.repo.issues = info.open_issues;
                    GlobalProjects.update({_id:project._id}, project);
                }
            });
        }
        // HTTP.get('')
        // console.log(jobs.length);
        for(var k = 0; k < jobs.length; k++)
        {
            // console.log(k);
            jobs[k].done();
            // jobs[k].remove();
        }
        cb();
    });

    var job = new Job(myJobs, 'update-project', {'update':true});
    job.priority('normal')
      .retry({retries: 0})
      .delay(0)
      .repeat({
          repeats: Job.forever,
          wait: 1000*15*60
      })     // Wait an hour before first try
      .save();

};

Modules.server.startjobs = startjobs;