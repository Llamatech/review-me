/* eslint-disable no-global-assign, no-undef, import/extensions,
import/no-extraneous-dependencies, meteor/no-session, react/jsx-no-bind,
no-useless-escape, react/forbid-proptypes, no-unused-vars */
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Well} from 'react-bootstrap';

class Comment extends Component {
    render() {
        return (
            <div>
                <Well bsSize="small">
                    {this.props.comentario.text}
                    {Meteor.user() && Meteor.user().services.github.username === this.props.comentario.owner
                        ? <a type="button" onClick={() => this.props.eraseComment(this.props.comentario._id)} className="close" aria-label="Close">
                                <span aria-hidden="true">
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </span>
                            </a>
                        : null
}
                </Well>
            </div>
        );
    }
}

export default Comment;
