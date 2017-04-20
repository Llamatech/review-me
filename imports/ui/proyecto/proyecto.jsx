/* eslint-disable no-undef,
 no-unused-vars */
import React from 'react';
import {Tooltip, OverlayTrigger, Well, Button} from 'react-bootstrap';
import PModal from './proyModal';
import ReactStars from 'react-stars';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

class Proyecto extends React.Component {

    constructor(props) {
        super(props);
        var rating = 0;
        if (props.proyecto.ratings) {
            rating = props.proyecto.ratings.avgRate;
        }
        this.state = {
            avgRating: rating,
            comments: props.proyecto.comments,
            alert: false,
            alertText: '',
            conf: null
        };
    }

    addRating(newRate) {
        if (Meteor.user()) {
            Meteor.call('projects.addRating', {projId:this.props.proyecto._id, newRate:newRate}, (err, res) => {
                this.setState({avgRating: this.props.proyecto.ratings.avgRate});
            });
        } else {
            this.setState({avgRating: this.props.proyecto.ratings.avgRate});
        }
    }

    confirmation(){

        const getAlert = () => (
            <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure you want to delete this project?"
            onCancel={()=>{
                this.fileSave();
            }}
            onConfirm={()=>{
                this.fileDeleted();
            }}
            >
            Your project will be permanently deleted.
            </SweetAlert>
        );

        this.setState({
            conf: getAlert()
        });
    }

    fileSave() {
        const getAlert = () => (
            <SweetAlert error confirmBtnText="Ok" confirmBtnBsStyle="danger" title="Your project was not deleted" onConfirm={() => {
                this.hideAlert();
            }}></SweetAlert>
        );

        this.setState({conf: getAlert()});
    }

    fileDeleted() {
        const getAlert = () => (
            <SweetAlert success confirmBtnText="Ok" confirmBtnBsStyle="success" title="Your project was successfully deleted" onConfirm={() => {
                this.hideAlert();
                this.props.eraseProject(this.props.proyecto._id);
            }}></SweetAlert>
        );

        this.setState({conf: getAlert()});
    }

    hideAlert() {
        this.setState({conf: null});
    }

    eraseComment(commId) {
        Meteor.call('projects.removeComment', {projId:this.props.proyecto._id, commId:commId}, (err, res) => {
            console.log(err);
            this.setState({comments: this.props.proyecto.comments});
        });
    }

    saveComment(text) {
        if (text.length < 5) {
            this.setState({alert: true, alertText: 'Comments should be longer than 5 characters!'});
        } else if (!Meteor.user()) {
            this.setState({alert: true, alertText: 'You have to be logged in to comment'});
        } else {
            Meteor.call('projects.addComment', {projId:this.props.proyecto._id, comment:text}, (err, res) => {
                this.setState({comments: this.props.proyecto.comments, alert: false});
            });

        }
    }

    render() {
        const tooltip = (
            <Tooltip id="tooltip">Erase this project</Tooltip>
        );
        return (

            <div className="proyecto">

                <Well bsSize="lg">
                    <div className="">
                        <div className="row text-center">
                            {Meteor.user() && Meteor.user().services.github.username === this.props.proyecto.user
                                ? <OverlayTrigger placement="right" overlay={tooltip}>

                                        <a type="button" onClick={() => this.confirmation()} className="close proyClose" aria-label="Erase project">
                                            <span aria-hidden="true">×</span>
                                        </a>
                                    </OverlayTrigger>

                                : null
}
                            <h2>{this.props.proyecto.name}</h2>
                            <h5>{this.props.proyecto.owner}</h5>
                        </div>
                        {this.state.conf}
                        {this.props.proyecto.summary && <div className="row text-center">
                            <p>{this.props.proyecto.summary}</p>
                        </div>
}
                        <div className="row text-center">
                            <a href={this.props.proyecto.url} target="_blank">
                                <h5>
                                    <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                                    Repo</h5>
                            </a>

                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <h6>
                                    <i className="fa fa-code-fork fa-lg" aria-hidden="true"></i>
                                    Forks: {this.props.proyecto.repo.forks}</h6>
                            </div>
                            <div className="col-md-4">
                                <h6>
                                    <i className="fa fa-star fa-lg" aria-hidden="true"></i>
                                    Stars: {this.props.proyecto.repo.stars}</h6>
                            </div>
                            <div className="col-md-4">
                                <h6>
                                    <i className="fa fa-eye fa-lg" aria-hidden="true"></i>
                                    Watches: {this.props.proyecto.repo.watchers}
                                </h6>
                            </div>
                        </div>
                        <div className="no row text-center">
                            <ReactStars count={5} size={24} color2={'#637a00'} edit={false} value={this.state.avgRating}/>
                        </div>
                        <div className="row text-center">
                            <br></br>
                            <PModal login={this.props.login} eraseComment={this.eraseComment.bind(this)} alert={this.state.alert} alertText={this.state.alertText} proyecto={this.props.proyecto} addRating={this.addRating.bind(this)} avgRating={this.state.avgRating} comments={this.state.comments} saveComment={this.saveComment.bind(this)}/>
                        </div>

                    </div>
                </Well>
            </div>
        );
    }
}

export default Proyecto;
