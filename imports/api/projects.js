/* eslint-disable no-global-assign, no-undef, import/extensions */

import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import ObjectId from 'bson-objectid';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';


export const Projects = new Mongo.Collection('projects');

Projects.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});
// GlobalProjects = Projects;

export const insertProject = new ValidatedMethod({
    name: 'projects.insert',
    validate: new SimpleSchema({
        project: {
            type: Object
        },
        'project.url': {
            type: String
        },
        'project.description': {
            type: String,
            optional:true
        },
        'project.collaborator': {
            type: String,
            optional: true
        },
        'project.id': {
            type: Number
        },
        'project.name': {
            type: String
        },
        'project.owner': {
            type: String
        },
        'project.summary': {
            type: String
        },
        'project.webpage': {
            type: String,
            optional:true
        },
        'project.repo': {
            type: Object
        },
        'project.repo.url': { type: String },
        'project.repo.fork': { type: Boolean},
        'project.repo.watchers': { type: Number },
        'project.repo.forks': { type: Number },
        'project.repo.stars': { type: Number },
        'project.repo.language': { type: String },
        'project.repo.issues': { type: Number },
        'project.parent_repo': { type: String },
        'project.comments': { type: Array },
        'project.comments.$': { type: Object},
        'project.ratings': { type: Object, blackbox:true },
        'project.user': { type: String }
    }).validator(),
    run({project}) {
        Projects.insert(project);
    }
});

export const addComment = new ValidatedMethod({
    name: 'projects.addComment',
    validate: new SimpleSchema({
        projId: { type: String },
        comment: { type: String }
    }).validator(),
    run({projId, comment}) {

        Projects.update(projId, {
            $push: {
                comments: {
                    '_id': ObjectId(),
                    'text': comment,
                    'owner': Meteor.user().services.github.username
                }
            }
        });
    }
});

export const addRating = new ValidatedMethod({
    name: 'projects.addRating',
    validate: new SimpleSchema({
        projId: { type: String },
        newRate: { type: Number }
    }).validator(),
    run({projId, newRate}) {
        var found = false;
        var proj = Projects.find(projId).fetch()[0];

        var history = proj.ratings.ratings;

        for (var i = 0; i < history.length; i++) {
            if (history[i].owner === Meteor.user().services.github.username) {
                found = true;
                proj.ratings.ratings[i].value = newRate;
            }

        }

        var sum = history.reduce((a, b) => a + b.value, 0);
        var n = history.length;
        var newR = found
            ? (sum / n)
            : ((sum + newRate) / (n + 1));

        proj.ratings.avgRate = newR;
        if (!found)
            proj.ratings.ratings.push({'value': newRate, 'owner': Meteor.user().services.github.username});

        Projects.update(projId, proj);
    }
});

export const removeComment = new ValidatedMethod({
    name: 'projects.removeComment',
    validate: new SimpleSchema({
        projId: { type: String },
        commId: { type: ObjectId(), blackbox:true },
        'commId._str': { type: String }
    }).validator(),
    run({projId, commId}) {
        const comments = Projects.find(projId).fetch()[0].comments;
        for(comment in comments){
            if(comment.commId===commId && !comment.owner===Meteor.user().services.github.username){
                throw new Meteor.Error('projects.removeComment.unauthorized','Cannot erase this comment because you didn\'t make it');
            }
        }
        Projects.update(projId, {
            $pull: {
                comments: {
                    '_id': commId
                }
            }
        });
        // console.log(Projects.find(projId).fetch());
        return Projects.find(projId).fetch()[0].comments;
    }
});

export const eraseProject = new ValidatedMethod({
    name: 'projects.eraseProject',
    validate: new SimpleSchema({
        projId: { type: String }
    }).validator(),
    run({projId}) {
        if(Projects.find(projId).fetch()[0].user!==Meteor.user().services.github.username){
            throw new Meteor.Error('projects.eraseProject.unauthorized','Cannot erase this project because you didn\'t add it');

        }
        Projects.remove(projId);
    }
});

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
    insertProject,
    addComment,
    addRating,
    removeComment,
    eraseProject,
], 'name');
// Only allow 5 list operations per connection per second
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(LISTS_METHODS, name);
        },
    // Rate limit per connection ID
        connectionId() { return true; }
    }, 5, 1000);
}


// export const addComment = new ValidatedMethod({
//
// });

// Meteor.methods({
    // 'projects.insert' (project) {
    //     // const urlP = require('url-parse');
    //     //
    //     // const urlObj = urlP(project.url, true);
    //     // const path = urlObj.pathname;
    //     // const routes = path.split('/');
    //     // let owner = routes[1];
    //     // const repo = routes[2];
    //     // const apiEndpoint = 'https://api.github.com/repos/';
    //     // const apiUrl = `${apiEndpoint}${owner}/${repo}`;
    //     //
    //     // axios.get(apiUrl, {}).then((response) => {
    //     //     const body = response.data;
    //     //     owner = body.owner;
    //     //     project.id = body.id;
    //     //     project.name = body.name;
    //     //     project.owner = owner.login;
    //     //     project.summary = body.description;
    //     //     project.webpage = body.homepage;
    //     //     project.repo = {
    //     //         url: body.html_url,
    //     //         fork: body.fork
    //     //     };
    //     //     let info = body;
    //     //     project.parent_repo = '';
    //     //     if (body.fork) {
    //     //         info = body.parent;
    //     //         project.parent_repo = body.parent.owner.html_url;
    //     //     }
    //     //     project.repo.watchers = info.watchers_count;
    //     //     project.repo.forks = info.forks_count;
    //     //     project.repo.stars = info.stargazers_count;
    //     //     project.repo.language = info.language;
    //     //     project.repo.issues = info.open_issues;
    //     //     project.comments = [];
    //     //     project.ratings = { avgRate: 0, ratings:[]};
    //     //     project.user = Meteor.user().services.github.username;
    //     //     Projects.insert(project, () => {console.log(Projects.find({}).fetch())});
    //     // });
    //
    //
    //     Projects.insert(project);
    // },
    // 'projects.addComment' (projId, comment) {
    //     check(projId, String);
    //     check(comment, String);
    //
    //     Projects.update(projId, {
    //         $push: {
    //             comments: {
    //                 '_id': ObjectId(),
    //                 'text': comment,
    //                 'owner': Meteor.user().services.github.username
    //             }
    //         }
    //     });
    // },
    // 'projects.addRating' (projId, newRate) {
    //     check(projId, String);
    //     check(newRate, Number);
    //
    //     var found = false;
    //     var proj = Projects.find(projId).fetch()[0];
    //
    //     var history = proj.ratings.ratings;
    //
    //     for (var i = 0; i < history.length; i++) {
    //         if (history[i].owner === Meteor.user().services.github.username) {
    //             found = true;
    //             proj.ratings.ratings[i].value = newRate;
    //         }
    //
    //     }
    //
    //     var sum = history.reduce((a, b) => a + b.value, 0);
    //     var n = history.length;
    //     var newR = found
    //         ? (sum / n)
    //         : ((sum + newRate) / (n + 1));
    //
    //     proj.ratings.avgRate = newR;
    //     if (!found)
    //         proj.ratings.ratings.push({'value': newRate, 'owner': Meteor.user().services.github.username});
    //     console.log(proj.ratings);
    //
    //     Projects.update(projId, proj);
    // },
    // 'projects.search'(search_term) {
    //     check(search_term, String);
    //
    //     var projs = Projects.find({
    //         $or: [
    //             {name:{'$regex':'\X*'+search_term+'\X*'}},
    //             {summary:{'$regex':'\X*'+search_term+'\X*'}},
    //             {owner:{'$regex':'\X*'+search_term+'\X*'}}
    //         ]
    //     }).fetch();
    //     return projs;
    // },
    // 'projects.removeComment' (projId, commId) {
    //     Projects.update(projId, {
    //         $pull: {
    //             comments: {
    //                 '_id': commId
    //             }
    //         }
    //     });
    //     // console.log(Projects.find(projId).fetch());
    //     return Projects.find(projId).fetch()[0].comments;
    //
    // },
    // 'projects.eraseProject' (projId) {
    //     Projects.remove(projId);
    // }
// });
