import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import Navib from './navbar.jsx';
import {Meteor} from 'meteor/meteor';

import {FormControl, FormGroup, Button} from 'react-bootstrap';


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

    });
}
