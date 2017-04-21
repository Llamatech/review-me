import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { chai, expect } from 'meteor/practicalmeteor:chai';

import PForm from './proyForm.jsx';
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

    describe('New project form', function() {
        this.timeout(15000);

        it('Should render <PForm /> element', function() {
            const modalCloseMock = sinon.spy();
            const addProjectMock = sinon.spy();
            const wrapper = shallow(<PForm show={true} modalClose={modalCloseMock} addProject={addProjectMock} />);
            // console.log(wrapper.debug());
            expect(wrapper.children()).to.have.length(1);
        });

        it('Should validate github url', function() {
            const good_url = 'https://github.com/Llamatech/review-me'
            const bad_url = 'http://bitbucket.com/user/repo'
            const modalCloseMock = sinon.spy();
            const addProjectMock = sinon.spy();
            const wrapper = shallow(<PForm show={true} modalClose={modalCloseMock} addProject={addProjectMock} />);

            const form_wrapper = wrapper.find('form');
            const url_entry = form_wrapper.find(FormControl).at(0);
            const url_group = form_wrapper.find(FormGroup).at(0);
            // console.log(url_entry.debug());
            url_entry.simulate('change', {target: {value: good_url}});
            let ret = wrapper.instance().checkGithub();
            chai.assert.equal(ret,'success');
            url_entry.simulate('change', {target: {value: bad_url}});
            ret = wrapper.instance().checkGithub();
            chai.assert.equal(ret,'error');
            // console.log(form_wrapper.debug());
            // console.log(url_group.debug());
            // console.log(url_group.at(0).props());
            // const btn = form_wrapper.find(Button).at(0);
            // btn.simulate('submit');
            // console.log(wrapper.state());
            // console.log(form_wrapper.find(FormControl).debug());
        });

        it('Should handle changes', function() {
            const urlChange = 'holi.com';
            const descChange = 'description';
            const collabChange = 'collab';
            const modalCloseMock = sinon.spy();
            const addProjectMock = sinon.spy();
            const wrapper = shallow(<PForm show={true} modalClose={modalCloseMock} addProject={addProjectMock} />);

            const form_wrapper = wrapper.find('form');
            console.log(form_wrapper.find(FormControl).at(1).debug());
            const url_entry = form_wrapper.find(FormControl).at(0);
            const desc_entry = form_wrapper.find(FormControl).at(1);
            const collab_entry = form_wrapper.find(FormControl).at(2);

            // console.log(url_entry.debug());
            url_entry.simulate('change', {target: {value: urlChange}});
            chai.assert.equal(wrapper.state().url,urlChange);
            desc_entry.simulate('change', {target: {value: descChange}});
            chai.assert.equal(wrapper.state().description,descChange);
            collab_entry.simulate('change', {target: {value: collabChange}});
            chai.assert.equal(wrapper.state().collaborator,collabChange);
            // chai.assert.equal(ret,'error');


        });
    });
}
