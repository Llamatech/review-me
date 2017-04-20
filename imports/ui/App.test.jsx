
/* eslint-disable no-undef,
 no-unused-vars, no-debugger */
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import {Projects} from '../api/projects.js';
import {Meteor} from 'meteor/meteor';
import App from './App.jsx';

import { Button, Modal, Tooltip } from 'react-bootstrap';
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

    describe('App', function () {
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

        });

        it('Should Render component <App/>', function () {

            const result  = shallow(<App />);
            //chai.assert(result.hasClass('app'));
        });

        // it("Should render a complete project", function() {
        //     const testProject = Factory.build('project', {
        //             'url' : 'https://github.com/Llamatech/review-me',
        //             'description' : 'description',
        //             'collaborator' : 'collaborator',
        //             'id' : 83160698,
        //             'name' : 'review-me',
        //             'owner' : 'Llamatech',
        //             'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
        //             'webpage' : 'holi.com',
        //             'repo' : {
        //                 'url' : 'https://github.com/Llamatech/review-me',
        //                 'fork' : false,
        //                 'watchers' : 0,
        //                 'forks' : 8,
        //                 'stars' : 0,
        //                 'language' : 'JavaScript',
        //                 'issues' : 3,
        //             },
        //             'parent_repo' : '',
        //             'comments' : [],
        //             'ratings' : {
        //                 'avgRate': 3,
        //             },
        //             'user' : 'andfoy'
        //     });
        //
        //     const wrapper  = shallow(<PModal proyecto={testProject}
        //         avgRating={testProject.ratings.avgRate} comments={testProject.comments} />);
        //     const modal = wrapper.find(Modal);
        //
        //     const title = modal.children().children().children().children().at(0);
        //     const info = modal.children().at(1);
        //     const description = info.children().at(0).children().at(1);
        //     const stats = info.children().at(2);
        //     // stats.children().at(1).text()
        //     const language = info.children().at(3);
        //     const webpage = info.children().at(4);
        //     const collab = info.children().at(6);
        //     const rating = info.children().at(7).children().at(1);
        //     //.props().value
        //     // console.log(rating.debug());
        //
        //     chai.assert.equal(title.text(), testProject.name);
        //     chai.assert.equal(description.text(), testProject.description);
        //     chai.assert.equal(stats.children().at(0).text(), ' Forks: '+testProject.repo.forks);
        //     chai.assert.equal(stats.children().at(1).text(), ' Stars: '+testProject.repo.stars);
        //     chai.assert.equal(stats.children().at(2).text(), ' Watches: '+testProject.repo.watchers);
        //     chai.assert.equal(stats.children().at(3).text(), ' Issues: '+testProject.repo.issues);
        //     chai.assert.equal(language.text(), 'Primary language: '+testProject.repo.language);
        //     chai.assert.equal(webpage.text(), 'Webpage: '+testProject.webpage);
        //     chai.assert.equal(collab.text(), 'Owner\'s prefered collaborator profile'+testProject.collaborator+'Start collaborating!');
        //     chai.assert.equal(rating.props().value, testProject.ratings.avgRate);
        // });
        //
        // it("Project without webpage, collaborator profile or description should not have them", function() {
        //     const testProject = Factory.build('project', {
        //             'url' : 'https://github.com/Llamatech/review-me',
        //             'description' : '',
        //             'collaborator' : '',
        //             'id' : 83160698,
        //             'name' : 'review-me',
        //             'owner' : 'Llamatech',
        //             'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
        //             'webpage' : '',
        //             'repo' : {
        //                 'url' : 'https://github.com/Llamatech/review-me',
        //                 'fork' : false,
        //                 'watchers' : 0,
        //                 'forks' : 8,
        //                 'stars' : 0,
        //                 'language' : 'JavaScript',
        //                 'issues' : 3,
        //             },
        //             'parent_repo' : '',
        //             'comments' : [],
        //             'ratings' : {
        //                 'avgRate': 3,
        //             },
        //             'user' : 'andfoy'
        //     });
        //
        //     const wrapper  = shallow(<PModal proyecto={testProject}
        //         avgRating={testProject.ratings.avgRate} comments={testProject.comments} />);
        //     const modal = wrapper.find(Modal);
        //
        //     const info = modal.children().at(1);
        //     const description = info.find('#description');
        //     const webpage = info.find('#webpage');
        //     const collab = info.find('#collaborator');
        //     //.props().value
        //     expect(description).to.have.length(0);
        //     expect(webpage).to.have.length(0);
        //     expect(collab).to.have.length(0);
        // });
        //
        // it("If no user is logged, should leave feedback for reviews and ratings", function() {
        //     Meteor.user = function() {
        //         return null;
        //     };
        //     const testProject = Factory.build('project', {
        //             'url' : 'https://github.com/Llamatech/review-me',
        //             'description' : '',
        //             'collaborator' : '',
        //             'id' : 83160698,
        //             'name' : 'review-me',
        //             'owner' : 'Llamatech',
        //             'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
        //             'webpage' : '',
        //             'repo' : {
        //                 'url' : 'https://github.com/Llamatech/review-me',
        //                 'fork' : false,
        //                 'watchers' : 0,
        //                 'forks' : 8,
        //                 'stars' : 0,
        //                 'language' : 'JavaScript',
        //                 'issues' : 3,
        //             },
        //             'parent_repo' : '',
        //             'comments' : [],
        //             'ratings' : {
        //                 'avgRate': 3,
        //             },
        //             'user' : 'andfoy'
        //     });
        //
        //     const wrapper  = shallow(<PModal proyecto={testProject}
        //         avgRating={testProject.ratings.avgRate} comments={testProject.comments} />);
        //     const modal = wrapper.find(Modal);
        //
        //     const info = modal.children().at(1);
        //     const logged = info.find('#notLogged');
        //     //.props().value
        //     expect(logged).to.have.length(1);
        //     chai.assert.equal(logged.text(),'To leave a review or rate this project, use your github user to sign in!')
        //     Meteor.user = function() {
        //         return {
        //             'services': {
        //                 'github': {
        //                     'username': 'Llamatest'
        //                 }
        //             }
        //         };
        //     };
        // });
        //
        // it("Project without webpage, collaborator profile or description should not have them", function() {
        //     const testProject = Factory.build('project', {
        //             'url' : 'https://github.com/Llamatech/review-me',
        //             'description' : '',
        //             'collaborator' : '',
        //             'id' : 83160698,
        //             'name' : 'review-me',
        //             'owner' : 'Llamatech',
        //             'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
        //             'webpage' : '',
        //             'repo' : {
        //                 'url' : 'https://github.com/Llamatech/review-me',
        //                 'fork' : false,
        //                 'watchers' : 0,
        //                 'forks' : 8,
        //                 'stars' : 0,
        //                 'language' : 'JavaScript',
        //                 'issues' : 3,
        //             },
        //             'parent_repo' : '',
        //             'comments' : [],
        //             'ratings' : {
        //                 'avgRate': 3,
        //             },
        //             'user' : 'andfoy'
        //     });
        //
        //     const wrapper  = shallow(<PModal proyecto={testProject}
        //         avgRating={testProject.ratings.avgRate} comments={testProject.comments} />);
        //     const modal = wrapper.find(Modal);
        //
        //     const info = modal.children().at(1);
        //     const description = info.find('#description');
        //     const webpage = info.find('#webpage');
        //     const collab = info.find('#collaborator');
        //     //.props().value
        //     expect(description).to.have.length(0);
        //     expect(webpage).to.have.length(0);
        //     expect(collab).to.have.length(0);
        // });
        //
        // it('Should close modal', function() {
        //     const testProject = Factory.build('project', {
        //             'url' : 'https://github.com/Llamatech/review-me',
        //             'description' : '',
        //             'collaborator' : '',
        //             'id' : 83160698,
        //             'name' : 'review-me',
        //             'owner' : 'Llamatech',
        //             'summary' : 'The Internet Project Database - A system to review and rate FOSS projects hosted on Github',
        //             'webpage' : '',
        //             'repo' : {
        //                 'url' : 'https://github.com/Llamatech/review-me',
        //                 'fork' : false,
        //                 'watchers' : 0,
        //                 'forks' : 8,
        //                 'stars' : 0,
        //                 'language' : 'JavaScript',
        //                 'issues' : 3,
        //             },
        //             'parent_repo' : '',
        //             'comments' : [],
        //             'ratings' : {
        //                 'avgRate': 3,
        //             },
        //             'user' : 'andfoy'
        //     });
        //
        //     const wrapper  = shallow(<PModal proyecto={testProject}
        //         avgRating={testProject.ratings.avgRate} comments={testProject.comments} />);
        //     // console.log(wrapper.instance())
        //     wrapper.instance().modalClose();
        //     const modal = wrapper.find(Modal);
        //
        //     //.props().value
        //     chai.assert.equal(modal.props().show, false);
        //
        // });
    });
}
