/* eslint-env mocha */

import {Meteor} from 'meteor/meteor';
import {Projects} from './projects.js';
import { assert } from 'meteor/practicalmeteor:chai';

if(Meteor.server)
{
    Meteor.user = function() {
        return {
            'services': {
                'github': {
                    'username': 'Llamatest'
                }
            }
        };
    };

    describe('Projects', function() {
        beforeEach(function() {
            Projects.remove({});
            Projects.insert({
                'url' : 'https://github.com/Llamatech/review-me',
                'description' : '',
                'collaborator' : '',
                'id' : 83160698,
                'name' : 'review-me',
                'owner' : 'Llamatech',
                'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                'webpage' : null,
                'repo' : {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'fork' : false,
                    'watchers' : 0,
                    'forks' : 8,
                    'stars' : 0,
                    'language' : 'JavaScript',
                    'issues' : 3,
                },
                'parent_repo' : '',
                'comments' : [],
                'ratings' : [ 0, [] ],
                'user' : 'andfoy'
            });
        });

        it('Should find a newly created project', function() {
            const result = Projects.find({});
            // console.log(result)
            assert.equal(result.count(), 1);
        });

        it('Should comment a project', function() {
            const project = Projects.find({}).fetch();
            // console.log(project[0]);
            Meteor.call('projects.addComment', project[0]._id, 'Some comment', function() {
                // console.log(err)
                const projectModified = Projects.find({}).fetch();
                assert.equal(projectModified[0].comments.length, 1);
                // console.log(projectModified[0]);
            });
        });

        it('Should update mean rating of a project', function() {
            const project = Projects.find({}).fetch();
            Meteor.call('projects.addRating', project[0]._id, 5, function() {
                // console.log(err);
                Meteor.user = function() {
                    return {
                        'services': {
                            'github': {
                                'username': 'Llamatest2'
                            }
                        }
                    };
                };
                Meteor.call('projects.addRating', project[0]._id, 3, function() {
                    // console.log(err);
                    const projectModified = Projects.find({}).fetch();
                    // console.log(projectModified[0].ratings);
                    assert.equal(projectModified[0].ratings[0], 4);
                });
            });
        });

        it('An user can only rate a project once', function() {
            const project = Projects.find({}).fetch();
            Meteor.call('projects.addRating', project[0]._id, 5, function() {
                // console.log(err);
                Meteor.call('projects.addRating', project[0]._id, 3, function() {
                    // console.log(err);
                    const projectModified = Projects.find({}).fetch();
                    // console.log(projectModified[0].ratings);
                    assert.equal(projectModified[0].ratings[0], 3);
                });
            });
        });

    });
}