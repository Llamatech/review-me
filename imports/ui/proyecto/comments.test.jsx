import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import Comments from './comments/comments.jsx';
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

    describe('Comments View', function() {
        this.timeout(15000);

        it('Should render <Comments /> element', function() {
            const exampleComments  = [
                {
                    'text': 'Test comment',
                    'owner': 'Llamatest',
                    '_id': 'Who?'
                },
                {
                    'text': 'Test comment 2',
                    'owner': 'andfoy',
                    '_id': 'Who2?'
                }
            ];

            const deleteFunc = sinon.spy();
            const saveFunc = sinon.spy();
            const wrapper = shallow(<Comments comments={exampleComments} alert={false} alertText={''} eraseComment={deleteFunc} saveComment={saveFunc}/>);
            // console.log(wrapper.children().length);
            expect(wrapper.children()).to.have.length(3);
        });

        it('Should render comments', function() {
            const exampleComments  = [
                {
                    'text': 'Test comment',
                    'owner': 'Llamatest',
                    '_id': 'Who?'
                },
                {
                    'text': 'Test comment 2',
                    'owner': 'andfoy',
                    '_id': 'Who2?'
                },
                {
                    'text': 'Just another comment',
                    'owner': 'Llamatest2',
                    '_id': 'Who3'
                }
            ];

            const deleteFunc = sinon.spy();
            const saveFunc = sinon.spy();
            const wrapper = shallow(<Comments comments={exampleComments} alert={false} alertText={''} eraseComment={deleteFunc} saveComment={saveFunc}/>);
            // console.log(wrapper.debug());

            const comments = wrapper.find(Comment);
            expect(comments).to.have.length(3);

        });

        it('Should allow to write new comments if user exists', function() {
            const deleteFunc = sinon.spy();
            const saveFunc = sinon.spy();
            const wrapper = mount(<Comments comments={[]} alert={false} alertText={''} eraseComment={deleteFunc} saveComment={saveFunc}/>);
            // console.log(wrapper.debug());
            const form_wrapper = wrapper.find('form');
            const form_text = form_wrapper.childAt(0);
            // const form_text = form_wrapper.first();
            // console.log(form_text.debug());
            form_text.simulate('change', {target: {value: 'My name is Microsoft Sam and this is your computers default voice'}});
            // console.log(wrapper.state());
            chai.assert.equal(wrapper.state('curComment'), 'My name is Microsoft Sam and this is your computers default voice');
            const submit_btn = form_wrapper.find('button');
            // submit_btn.simulate('click');
            submit_btn.simulate('submit');
            // wrapper.find('[type="submit"]').get(0).click();
            // console.log(saveFunc.calledOnce);
            chai.assert(saveFunc.calledOnce);
            chai.assert.equal(saveFunc.args[0], 'My name is Microsoft Sam and this is your computers default voice');
            // console.log(wrapper.state());

        });

        it('Should not allow to comment if user is undefined', function() {
            Meteor.user = function() {
                return null;
            };
            const exampleComments  = [
                {
                    'text': 'Test comment',
                    'owner': 'Llamatest',
                    '_id': 'Who?'
                },
                {
                    'text': 'Test comment 2',
                    'owner': 'andfoy',
                    '_id': 'Who2?'
                }
            ];
            const deleteFunc = sinon.spy();
            const saveFunc = sinon.spy();
            const wrapper = shallow(<Comments comments={exampleComments} alert={false} alertText={''} eraseComment={deleteFunc} saveComment={saveFunc}/>);
            // console.log(wrapper.debug());

            expect(wrapper.children()).to.have.length(2);

            Meteor.user = function() {
                return {
                    'services': {
                        'github': {
                            'username': 'Llamatest'
                        }
                    }
                };
            };
        });
    });

}