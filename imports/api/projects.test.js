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
                'ratings' : {avgRate:0, ratings:[]},
                'user' : 'Llamatest2'
            });
        });

        it('Should find a newly created project', function() {
            // const result = Projects.find({});
            var project = {
                'url' : 'https://github.com/Llamatech/art-collection',
                'description' : '',
                'collaborator' : '',
                'id' : 67649904,
                'name' : 'art-collection',
                'owner' : 'Llamatech',
                'summary' : 'Identification and description of art oeuvres given its image.',
                'webpage' : null,
                'repo' : {
                    'url' : 'https://github.com/Llamatech/art-collection',
                    'fork' : false,
                    'watchers' : 0,
                    'forks' : 0,
                    'stars' : 0,
                    'language' : 'Python',
                    'issues' : 0,
                },
                'parent_repo' : '',
                'comments' : [],
                'ratings' : {avgRate:0, ratings:[]},
                'user' : 'cgarciahdez'
            };
            Meteor.call('projects.insert', {project}, function() {
                const result = Projects.find({});
                assert.equal(result.count(), 2);
            });
            // console.log(result)
        });

        it('Should comment a project', function() {
            const project = Projects.find({}).fetch();
            // console.log(project[0]);
            Meteor.call('projects.addComment', {projId:project[0]._id, comment:'Some comment'}, function() {
                // console.log(err)
                const projectModified = Projects.find({}).fetch();
                assert.equal(projectModified[0].comments.length, 1);
                // console.log(projectModified[0]);
            });
        });

        it('Should update mean rating of a project', function() {
            const project = Projects.find({}).fetch();
            Meteor.call('projects.addRating', {projId:project[0]._id, newRate:5}, function() {
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

                Meteor.call('projects.addRating', {projId:project[0]._id, newRate:3}, function() {
                    // console.log(err);
                    const projectModified = Projects.find({}).fetch();

                    assert.equal(projectModified[0].ratings.avgRate, 4);
                });
            });
        });

        it('An user can only rate a project once', function() {
            const project = Projects.find({}).fetch();
            Meteor.call('projects.addRating', {projId:project[0]._id, newRate:5}, function() {
                // console.log(err);
                Meteor.call('projects.addRating', {projId:project[0]._id, newRate:3}, function() {
                    // console.log(err);
                    const projectModified = Projects.find({}).fetch();
                    // console.log(projectModified[0].ratings);
                    assert.equal(projectModified[0].ratings.avgRate, 3);
                });
            });
        });

        it('Should not find erased project', function() {
            const project = Projects.find({}).fetch();
            Meteor.call('projects.eraseProject', {projId:project[0]._id}, function() {
                const afterProject = Projects.find({}).fetch();
                assert.equal(afterProject.length, 0);
            });
        });

        it('Should not find erased comment', function() {
            const project = Projects.find({}).fetch();
            // console.log(project[0]);
            Meteor.call('projects.addComment', {projId:project[0]._id, comment:'Some comment'}, function() {
                Meteor.user = function() {
                    return {
                        'services': {
                            'github': {
                                'username': 'Llamatest'
                            }
                        }
                    };
                };
                // console.log(err)
                const projectModified = Projects.find({}).fetch();
                // console.log(projectModified[0]);
                Meteor.call('projects.removeComment', {projId:projectModified[0]._id, commId:projectModified[0].comments[0]._id}, function() {
                    const afterProject = Projects.find({}).fetch();
                    assert.equal(afterProject[0].comments.length, 0);
                    // console.log(projectModified[0]);
                });
                // console.log(projectModified[0]);
            });
        });

    });
}
