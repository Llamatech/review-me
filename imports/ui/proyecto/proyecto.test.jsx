// debugger;

import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
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

        beforeEach(function () {
            console.log(Meteor.user());
            const user = {
                'services': {
                    'github': {
                        'username': 'Llamatest'
                    }
                }
            }
        });

        it("Should Render component <Proyecto/>", function () {
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

            const result  = shallow(<Proyecto id={testProject._id} proyecto={testProject} /> );
            console.log(result.hasClass('proyecto'));
          chai.assert(result.hasClass('proyecto'));
        });

        it("Should render a partial project", function() {
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
            console.log(stars_wrapper.debug());
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
    });
}