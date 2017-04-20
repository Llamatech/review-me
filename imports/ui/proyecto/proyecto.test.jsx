// debugger;
/* eslint-disable no-undef,
 no-unused-vars, no-debugger */
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import Proyecto from './proyecto.jsx';
import {Projects} from '../../api/projects.js';
import {Meteor} from 'meteor/meteor';

import {Tooltip, OverlayTrigger, Well, Button} from 'react-bootstrap';
import ReactStars from 'react-stars';



if(Meteor.isClient)
{

    Meteor.userId = function() {
        return '1213213';
    };

    Meteor.user = function() {
        return {
            'services': {
                'github': {
                    'username': 'Llamatest'
                }
            }
        };
    };

    Factory.define('project', Projects, {});

    describe('Projects', function () {
        this.timeout(15000);

        beforeEach(function () {
            // console.log(Meteor.user());
            const user = {
                'services': {
                    'github': {
                        'username': 'Llamatest'
                    }
                }
            };
            // const project = {
            //         'url' : 'https://github.com/Llamatech/review-me',
            //         'description' : 'Lorem',
            //         'collaborator' : 'Ipsum',
            //         'id' : 83160698,
            //         'name' : 'review-me',
            //         'owner' : 'Llamatech',
            //         'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
            //         'webpage' : 'http://review-me.margffoy-tuay.com',
            //         'repo' : {
            //             'url' : 'https://github.com/Llamatech/review-me',
            //             'fork' : false,
            //             'watchers' : 0,
            //             'forks' : 8,
            //             'stars' : 0,
            //             'language' : 'JavaScript',
            //             'issues' : 3,
            //         },
            //         'parent_repo' : '',
            //         'comments' : [],
            //         'ratings' : {
            //             'avgRate': 0,
            //             'ratings': []
            //         },
            //         'user' : 'Llamatest'
            // };

            // Meteor.call('projects.insert', {'project': project}, (err, data) => {
            //     console.log(err);
            // });
        });

        it('Should Render component <Proyecto/>', function () {
            const testProject = Factory.build('project', {
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
                    'ratings' : {
                        'avgRate': 3,
                    },
                    'user' : 'Llamatest'
            });

            const result  = shallow(<Proyecto id={testProject._id} proyecto={testProject} /> );
            // console.log(result.hasClass('proyecto'));
          chai.assert(result.hasClass('proyecto'));
        });

        it("Should render a disowned project", function() {
            const testProject = Factory.build('project', {
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
                    'ratings' : {
                        'avgRate': 3,
                    },
                    'user' : 'andfoy'
            });

            const wrapper  = shallow(<Proyecto id={testProject._id} proyecto={testProject} /> );
            const well = wrapper.find(Well);
            // console.log(well.debug());
            const info_wrapper = well.children().children();
            const info_header = info_wrapper.at(0);
            const summary_wrapper = info_wrapper.at(1);
            const url_wrapper = info_wrapper.at(2);
            const repo_stats = info_wrapper.at(3);
            const stars_wrapper = info_wrapper.at(4);
            // console.log(stars_wrapper.debug());
            chai.assert.equal(info_header.children().at(0).text(), testProject.name);
            chai.assert.equal(info_header.children().at(1).text(), testProject.owner);
            chai.assert.equal(summary_wrapper.text(), testProject.summary);
            chai.assert.equal(url_wrapper.childAt(0).props().href, testProject.url);
            chai.assert.equal(repo_stats.childAt(0).text(), 'Forks: ' + testProject.repo.forks);
            chai.assert.equal(repo_stats.childAt(1).text(), 'Stars: ' + testProject.repo.stars);
            chai.assert.equal(repo_stats.childAt(2).text(), 'Watches: ' + testProject.repo.watchers);
            chai.assert.equal(stars_wrapper.childAt(0).props().value, testProject.ratings.avgRate);
            // chai.assert(false);
        });

        it("Should render an owned project", function() {
            const testProject = Factory.build('project', {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'description' : 'Lorem',
                    'collaborator' : 'Ipsum',
                    'id' : 83160698,
                    'name' : 'review-me',
                    'owner' : 'Llamatech',
                    'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                    'webpage' : 'http://review-me.margffoy-tuay.com',
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
                    'ratings' : {
                        'avgRate': 3,
                    },
                    'user' : 'Llamatest'
            });

            const wrapper  = shallow(<Proyecto id={testProject._id} proyecto={testProject} /> );
            const well = wrapper.find(Well);
            // console.log(well.debug());
            const info_wrapper = well.children().children();
            const info_header = info_wrapper.at(0);
            const summary_wrapper = info_wrapper.at(1);
            const url_wrapper = info_wrapper.at(2);
            const repo_stats = info_wrapper.at(3);
            const stars_wrapper = info_wrapper.at(4);

            // const onButtonClick = sinon.spy();
            // console.log(info_header.childAt(0).childAt(0))
            // console.log(well.debug());
            // console.log(info_header.childAt(0).debug());
            chai.assert.equal(info_header.childAt(0).childAt(0).text(), '×');
            chai.assert.equal(info_header.children().at(1).text(), testProject.name);
            chai.assert.equal(info_header.children().at(2).text(), testProject.owner);
            chai.assert.equal(summary_wrapper.text(), testProject.summary);
            chai.assert.equal(url_wrapper.childAt(0).props().href, testProject.url);
            chai.assert.equal(repo_stats.childAt(0).text(), 'Forks: ' + testProject.repo.forks);
            chai.assert.equal(repo_stats.childAt(1).text(), 'Stars: ' + testProject.repo.stars);
            chai.assert.equal(repo_stats.childAt(2).text(), 'Watches: ' + testProject.repo.watchers);
            chai.assert.equal(stars_wrapper.childAt(0).props().value, testProject.ratings.avgRate);
            // chai.assert(false);
        });

        it("Should confirm project deletion", function() {
            const testProject = Factory.build('project', {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'description' : 'Lorem',
                    'collaborator' : 'Ipsum',
                    'id' : 83160698,
                    'name' : 'review-me',
                    'owner' : 'Llamatech',
                    'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                    'webpage' : 'http://review-me.margffoy-tuay.com',
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
                    'ratings' : {
                        'avgRate': 3,
                    },
                    'user' : 'Llamatest'
            });

            const onProjectDeletion = sinon.spy();
            const wrapper  = shallow(<Proyecto id={testProject._id} proyecto={testProject} eraseProject={onProjectDeletion} /> );
            const well = wrapper.find(Well);
            // console.log(well.debug());
            const info_wrapper = well.children().children();
            const info_header = info_wrapper.at(0);

            const delete_button = info_header.childAt(0).childAt(0);
            delete_button.simulate('click');
            // console.log(wrapper.debug());
            const confirmationDialog = wrapper.find(Well).children().children().at(1);
            confirmationDialog.simulate('confirm');
            // console.log(wrapper.debug());

            const deletionDialog = wrapper.find(Well).children().children().at(1);
            chai.assert.equal(deletionDialog.props().title, 'Your project was successfully deleted');
            deletionDialog.simulate('confirm');
            chai.assert(onProjectDeletion.calledOnce);
        });

        it("Should confirm project was not deleted", function() {
            const testProject = Factory.build('project', {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'description' : 'Lorem',
                    'collaborator' : 'Ipsum',
                    'id' : 83160698,
                    'name' : 'review-me',
                    'owner' : 'Llamatech',
                    'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                    'webpage' : 'http://review-me.margffoy-tuay.com',
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
                    'ratings' : {
                        'avgRate': 3,
                    },
                    'user' : 'Llamatest'
            });

            const onProjectDeletion = sinon.spy();
            const wrapper  = shallow(<Proyecto id={testProject._id} proyecto={testProject} eraseProject={onProjectDeletion} /> );
            const well = wrapper.find(Well);
            // console.log(well.debug());
            const info_wrapper = well.children().children();
            const info_header = info_wrapper.at(0);

            const delete_button = info_header.childAt(0).childAt(0);
            delete_button.simulate('click');
            // console.log(wrapper.debug());
            const confirmationDialog = wrapper.find(Well).children().children().at(1);
            confirmationDialog.simulate('cancel');
            // console.log(wrapper.debug());

            const deletionDialog = wrapper.find(Well).children().children().at(1);
            chai.assert.equal(deletionDialog.props().title, 'Your project was not deleted');
            deletionDialog.simulate('confirm');
            // chai.assert(onProjectDeletion.calledOnce);
        });

        it("Should update rating (user logged in)", function() {
            const project = {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'description' : 'Lorem',
                    'collaborator' : 'Ipsum',
                    'id' : 83160698,
                    'name' : 'review-me',
                    'owner' : 'Llamatech',
                    'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                    'webpage' : 'http://review-me.margffoy-tuay.com',
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
                    'ratings' : {
                        'avgRate': 0,
                        'ratings': []
                    },
                    'user' : 'Llamatest'
            };

            // const testProject = Factory.build('project', project);

            Meteor.call('projects.insert', {'project': project}, (err, data) => {
                // console.log(err);
            });

            const testProject = Projects.find({}).fetch()[0]
            // console.log(testProject);
            const onProjectDeletion = sinon.spy();
            const wrapper  = mount(<Proyecto id={testProject._id} proyecto={testProject} eraseProject={onProjectDeletion} /> );
            const well = wrapper.find(Well);
            const info_wrapper = well.children().children();
            const stars_wrapper = info_wrapper.at(4);
            const modal_wrapper = info_wrapper.at(5).childAt(1);
            const show_btn = modal_wrapper.find(Button);
            // console.log(show_btn.debug());
            show_btn.simulate('click');
            // const modal_wrapper_2 = info_wrapper.at(5).childAt(1);
            const modal_node = modal_wrapper.first().childAt(1);
            // console.log(modal_wrapper.debug());
            modal_wrapper.props().addRating(5);
            modal_wrapper.props().addRating(4);
            // modal_node.simulate('hide');
            // wrapper.update();
            // console.log(wrapper.update().state());
            chai.assert.equal(Projects.find({}).fetch()[0].ratings.avgRate, 4);

            // Meteor.call('projects.eraseProject', testProject._id);
        });

        it('Should not comment a project if text has less than 5 characters', function() {
            const project = {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'description' : 'Lorem',
                    'collaborator' : 'Ipsum',
                    'id' : 83160698,
                    'name' : 'review-me',
                    'owner' : 'Llamatech',
                    'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                    'webpage' : 'http://review-me.margffoy-tuay.com',
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
                    'ratings' : {
                        'avgRate': 0,
                        'ratings': []
                    },
                    'user' : 'Llamatest'
            };

            // const testProject = Factory.build('project', project);

            Meteor.call('projects.insert', {'project': project}, (err, data) => {
                // console.log(err);
            });

            const testProject = Projects.find({}).fetch()[0];
            const onProjectDeletion = sinon.spy();
            const wrapper  = shallow(<Proyecto id={testProject._id} proyecto={testProject} eraseProject={onProjectDeletion} /> );
            const well = wrapper.find(Well);
            const info_wrapper = well.children().children();
            const stars_wrapper = info_wrapper.at(4);
            const modal_wrapper = info_wrapper.at(5).childAt(1);
            // const show_btn = modal_wrapper.find(Button);
            // console.log(show_btn.debug());
            // show_btn.simulate('click');

            // const modal_node = modal_wrapper.first().childAt(1);
            console.log(modal_wrapper.debug());
            modal_wrapper.props().saveComment('1234');
            chai.assert.equal(wrapper.state('alertText'), 'Comments should be longer than 5 characters!');

        });

        it('Should comment a project', function() {

            const project = {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'description' : 'Lorem',
                    'collaborator' : 'Ipsum',
                    'id' : 83160698,
                    'name' : 'review-me',
                    'owner' : 'Llamatech',
                    'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                    'webpage' : 'http://review-me.margffoy-tuay.com',
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
                    'ratings' : {
                        'avgRate': 0,
                        'ratings': []
                    },
                    'user' : 'Llamatest'
            };

            // Meteor.user = function() {
            //     return undefined;
            // }

            // const testProject = Factory.build('project', project);

            Meteor.call('projects.insert', {'project': project}, (err, data) => {
            //     // console.log(err);
            });

            const testProject = Projects.find({}).fetch()[0];
            const onProjectDeletion = sinon.spy();
            const wrapper  = shallow(<Proyecto id={testProject._id} proyecto={testProject} eraseProject={onProjectDeletion} /> );
            const well = wrapper.find(Well);
            const info_wrapper = well.children().children();
            const stars_wrapper = info_wrapper.at(4);
            const modal_wrapper = info_wrapper.at(5).childAt(1);
            // const show_btn = modal_wrapper.find(Button);
            // console.log(show_btn.debug());
            // show_btn.simulate('click');

            // const modal_node = modal_wrapper.first().childAt(1);
            // console.log(modal_wrapper.debug());
            modal_wrapper.props().saveComment('Full Comment');
            const afterProject = Projects.find({}).fetch()[0];
            // console.log(afterProject.comments);
            chai.assert.equal(afterProject.comments[0].text, 'Full Comment');
            // console.log(modal_wrapper.props().comments);
            // chai.assert.equal(wrapper.state('alertText'), 'Comments should be longer than 5 characters!');

        });

        it('Should delete a comment', function() {

            const project = {
                    'url' : 'https://github.com/Llamatech/review-me',
                    'description' : 'Lorem',
                    'collaborator' : 'Ipsum',
                    'id' : 83160698,
                    'name' : 'review-me',
                    'owner' : 'Llamatech',
                    'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
                    'webpage' : 'http://review-me.margffoy-tuay.com',
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
                    'ratings' : {
                        'avgRate': 0,
                        'ratings': []
                    },
                    'user' : 'Llamatest'
            };

            // Meteor.user = function() {
            //     return undefined;
            // }

            // const testProject = Factory.build('project', project);

            Meteor.call('projects.insert', {'project': project}, (err, data) => {
            //     // console.log(err);
            });

            const testProject = Projects.find({}).fetch().slice(-1)[0];
            const onProjectDeletion = sinon.spy();
            const wrapper  = shallow(<Proyecto id={testProject._id} proyecto={testProject} eraseProject={onProjectDeletion} /> );
            const well = wrapper.find(Well);
            const info_wrapper = well.children().children();
            const stars_wrapper = info_wrapper.at(4);
            const modal_wrapper = info_wrapper.at(5).childAt(1);
            // const show_btn = modal_wrapper.find(Button);
            // console.log(show_btn.debug());
            // show_btn.simulate('click');

            // const modal_node = modal_wrapper.first().childAt(1);
            // console.log(modal_wrapper.debug());
            modal_wrapper.props().saveComment('Comment');
            const afterProject = Projects.find({}).fetch().slice(-1)[0];
            // console.log(afterProject.comments);
            chai.assert.equal(afterProject.comments[0].text, 'Comment');
            modal_wrapper.props().eraseComment(afterProject.comments[0]._id);
            const noCommentProject = Projects.find({}).fetch().slice(-1)[0];
            chai.assert.equal(noCommentProject.comments.length, 0);
            // console.log(modal_wrapper.props().comments);
            // chai.assert.equal(wrapper.state('alertText'), 'Comments should be longer than 5 characters!');

        });
    });
}
