/* eslint-disable no-undef,
 no-unused-vars, no-debugger */
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import Comment from './comments/comment.jsx';
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

    describe('Comment', function() {
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

        it('Should render component <Comment />', function() {
            const exampleComment = {
                'text': 'Test comment',
                'owner': 'Llamatest',
                '_id': 'Who?'
            };

            const deleteFunc = sinon.spy();
            const wrapper = shallow(<Comment comentario={exampleComment} eraseComment={deleteFunc}/>);
            const well_wrapper = wrapper.find(Well);
            expect(well_wrapper.children()).to.have.length(2);
        });

        it('Should have text', function() {
            const exampleComment = {
                'text': 'Test comment',
                'owner': 'Llamatest',
                '_id': 'Who?'
            };

            const deleteFunc = sinon.spy();
            const wrapper = shallow(<Comment comentario={exampleComment} eraseComment={deleteFunc}/>);
            const well_wrapper = wrapper.find(Well);
            // console.log(well_wrapper.childAt(0).text());
            chai.assert.equal(well_wrapper.childAt(0).text(), 'Test comment');
            // expect(well_wrapper.children()).to.have.length(2);
        });

        it('Should not display delete button if user is undefined/not owner', function() {
            const exampleComment = {
                'text': 'Test comment',
                'owner': 'andfoy',
                '_id': 'Who?'
            };
            const deleteFunc = sinon.spy();
            const wrapper = shallow(<Comment comentario={exampleComment} eraseComment={deleteFunc}/>);
            const well_wrapper = wrapper.find(Well);
            // console.log(well_wrapper.debug());
            expect(well_wrapper.children()).to.have.length(1);

        });

        it('Should invoke delete comment function if user is owner', function() {
            const exampleComment = {
                'text': 'Test comment',
                'owner': 'Llamatest',
                '_id': 'Who?'
            };
            const deleteFunc = sinon.spy();
            const wrapper = shallow(<Comment comentario={exampleComment} eraseComment={deleteFunc}/>);
            const well_wrapper = wrapper.find(Well);
            // console.log(well_wrapper.debug());
            const delete_btn = well_wrapper.childAt(1);
            delete_btn.simulate('click');
            chai.assert(deleteFunc.calledOnce);
            // expect(well_wrapper.children()).to.have.length(1);

        });
    });
}