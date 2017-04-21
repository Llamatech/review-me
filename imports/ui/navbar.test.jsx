import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import Navib from './navbar.jsx';
import PForm from './proyForm.jsx';
import {Meteor} from 'meteor/meteor';

import {FormControl, FormGroup, Button, Modal} from 'react-bootstrap';


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

    describe('Navbar', function() {
        this.timeout(15000);

        it('Should render <Navbar/> element', function() {
            const wrapper = shallow(<Navib />);
            chai.assert(wrapper.hasClass('navbar'));
            // console.log(wrapper.debug());
        });

        it('Should close modal', function() {

            const wrapper = shallow(<Navib />);

            wrapper.instance().modalClose();
            chai.assert.equal(wrapper.state().showModal,false);
            chai.assert.equal(wrapper.find(PForm).props().show,false)

        });

        it('Should open modal only when logged in', function() {

            const wrapper = shallow(<Navib />);
            Meteor.user = function() {
                return null;
            };
            wrapper.instance().modalOpen();
            chai.assert.equal(wrapper.state().showModal,false);
            chai.assert.equal(wrapper.find(PForm).props().show,false);
            chai.assert.equal(wrapper.state().alert,true);
            wrapper.find(Modal).props().onHide();
            chai.assert.equal(wrapper.state().alert,false);
            Meteor.user = function() {
                return {
                    'services': {
                        'github': {
                            'username': 'Llamatest'
                        }
                    }
                };
            };
            wrapper.instance().modalOpen();
            chai.assert.equal(wrapper.state().showModal,true);
            chai.assert.equal(wrapper.find(PForm).props().show,true)


        });

        it('Should only show info to logged in user', function() {


            Meteor.user = function() {
                return null;
            };
            const wrapper = shallow(<Navib />);
            expect(wrapper.find(Button)).to.have.length(1);
            Meteor.user = function() {
                return {
                    'services': {
                        'github': {
                            'username': 'Llamatest'
                        }
                    }
                };
            };
            const wrapper2 = shallow(<Navib />);
            expect(wrapper2.find('.logged')).to.have.length(1);

        });

    });
}
