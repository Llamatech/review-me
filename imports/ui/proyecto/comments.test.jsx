import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import Comments from './comments/comments.jsx';
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

            const wrapper = shallow(<Comments comments={exampleComments} />);
        });
    });
}