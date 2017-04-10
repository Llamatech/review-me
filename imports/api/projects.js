/* eslint-disable no-global-assign, no-undef */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import ObjectId from 'bson-objectid';

export const Projects = new Mongo.Collection('projects');

Meteor.methods({
  'projects.insert'(project) {
    Projects.insert(project);
  },
  'projects.remove'(projId) {
    check(projId, String);

    Projects.remove(projId);
  },
  'projects.addComment'(projId, comment) {
    check(projId, String);
    check(comment, String);

    Projects.update(projId, { $push: { comments: {"_id":ObjectId(),"text":comment, "owner":Meteor.user().services.github.username} } });
  },
  'projects.addRating'(projId, newRate) {
    check(projId, String);

    var found = false;
    var proj = Projects.find(projId).fetch()[0];

    var rate = proj.ratings[0];
    var history = proj.ratings[1];
    console.log(history);

    for (var i=0; i < history.length; i++) {
        if (history[i].owner === Meteor.user().services.github.username) {
            found=true;
            proj.ratings[1][i].value=newRate;
          }

        }

        var sum = history.reduce((a, b) => a + b.value, 0);
        var n= history.length;
        var newR = found?(sum/n):((sum+newRate)/(n+1));

        proj.ratings[0]=newR;
        if (!found) proj.ratings[1].push({'value':newRate,'owner':Meteor.user().services.github.username});

        Projects.update(projId, proj);
    },
    'projects.search'(search_term) {
        check(search_term, String);

        var projs = Projects.find({
            $or: [
                {name:{'$regex':'\X*'+search_term+'\X*'}},
                {summary:{'$regex':'\X*'+search_term+'\X*'}},
                {owner:{'$regex':'\X*'+search_term+'\X*'}}
            ]
        }).fetch();
        return projs;
    },
    'projects.removeComment'(projId, commId) {
        Projects.update(projId,{$pull: {comments:{'_id':commId}}});
        // console.log(Projects.find(projId).fetch());
        return Projects.find(projId).fetch()[0].comments;

    },
    'projects.eraseProject'(projId) {
        Projects.remove(projId);
    },
});
