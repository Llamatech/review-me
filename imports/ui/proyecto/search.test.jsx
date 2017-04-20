/* eslint-disable no-undef,
 no-unused-vars, no-debugger */
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import AdvSearch from './search.jsx';
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

    describe('Advanced Search Options', function() {
        this.timeout(15000);
        beforeEach(function () {
            // console.log(Meteor.user());
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

        it('Should render component <AdvSearch/>', function() {
            const searchFunc = sinon.spy();
            const wrapper = shallow(<AdvSearch buscarAdv={searchFunc} />);
            // console.log(wrapper.debug());
            chai.assert(wrapper.hasClass('linea'));
            // const fork_wrapper = wrapper.childAt(0).childAt(1);
        });

        it('Should update fork search value', function() {
            const searchFunc = sinon.spy();
            const wrapper = shallow(<AdvSearch buscarAdv={searchFunc} />);
            const fork_wrapper = wrapper.childAt(0).childAt(1);
            console.log(fork_wrapper.debug());
            fork_wrapper.simulate('change', {target: {value: '3'}});
            // console.log(fork_wrapper.debug());
            console.log(searchFunc.args[0][0]);
            chai.assert.equal(searchFunc.args[0][0].forks, "3");
        });

        it('Should update stars search value', function() {
            const searchFunc = sinon.spy();
            const wrapper = shallow(<AdvSearch buscarAdv={searchFunc} />);
            const fork_wrapper = wrapper.childAt(1).childAt(1);
            console.log(fork_wrapper.debug());
            fork_wrapper.simulate('change', {target: {value: '3'}});
            // console.log(fork_wrapper.debug());
            console.log(searchFunc.args[0][0]);
            chai.assert.equal(searchFunc.args[0][0].stars, "3");
        });

        it('Should update watchers search value', function() {
            const searchFunc = sinon.spy();
            const wrapper = shallow(<AdvSearch buscarAdv={searchFunc} />);
            const fork_wrapper = wrapper.childAt(2).childAt(1);
            console.log(fork_wrapper.debug());
            fork_wrapper.simulate('change', {target: {value: '3'}});
            // console.log(fork_wrapper.debug());
            console.log(searchFunc.args[0][0]);
            chai.assert.equal(searchFunc.args[0][0].watchers, "3");
        });

        it('Should update issues search value', function() {
            const searchFunc = sinon.spy();
            const wrapper = shallow(<AdvSearch buscarAdv={searchFunc} />);
            const fork_wrapper = wrapper.childAt(3).childAt(1);
            console.log(fork_wrapper.debug());
            fork_wrapper.simulate('change', {target: {value: '3'}});
            // console.log(fork_wrapper.debug());
            console.log(searchFunc.args[0][0]);
            chai.assert.equal(searchFunc.args[0][0].issues, "3");
        });
    });
}