/* eslint-disable no-undef,
 no-unused-vars */
import React from 'react';
import { Button, Modal, Tooltip } from 'react-bootstrap';
import ReactStars from 'react-stars';
import Comments from './comments/comments.jsx';

class PModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    modalClose() {
        this.setState({showModal: false});
    }

    modalOpen() {
        this.setState({showModal: true});
    }

    render () {
        const tooltip = (
            <Tooltip id="tooltip"><strong>You need to be logged in to leave a review</strong></Tooltip>
        );
        return(
      <div className="proyModal">

        <Button bsSize="sm" onClick={this.modalOpen.bind(this)}>
          Learn more
        </Button>

        <Modal show={this.state.showModal} onHide={this.modalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title><h2>{this.props.proyecto.name}  <small><a href={'https://github.com/'+this.props.proyecto.owner}>{this.props.proyecto.owner}</a></small></h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.proyecto.description?
              <div id="description">
            <h3>Description</h3>
            <p>{this.props.proyecto.description}</p>

            <hr />
            </div>:null
            }

            <h3>Open source information</h3>
              <div className="row">
                <div className ="col-md-3">
                  <h6><i className="fa fa-code-fork fa-lg" aria-hidden="true"></i> Forks: {this.props.proyecto.repo.forks}</h6>
                </div>
                <div className ="col-md-3">
                  <h6><i className="fa fa-star fa-lg" aria-hidden="true"></i> Stars: {this.props.proyecto.repo.stars}</h6>
                </div>
                <div className ="col-md-3">
                  <h6><i className="fa fa-eye fa-lg" aria-hidden="true"></i> Watches: {this.props.proyecto.repo.watchers}</h6>
                </div>
                <div className ="col-md-3">
                  <h6><i className="fa fa-exclamation-circle fa-lg" aria-hidden="true"></i> Issues: {this.props.proyecto.repo.issues}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h4>Primary language: <small>{this.props.proyecto.repo.language}</small></h4>
                </div>
              </div>

              {this.props.proyecto.webpage &&
                <div className="row" id="webpage">
                  <div className="col-md-12">
                    <h4>Webpage: <a href={this.props.proyecto.webpage}><small>{this.props.proyecto.webpage}</small></a></h4>
                  </div>
                </div>
              }
              <hr/>

              {this.props.proyecto.collaborator &&<div id="collaborator">
                  <h3>Owner's prefered collaborator profile</h3>
                  <p>{this.props.proyecto.collaborator}</p>
                  <a href={this.props.proyecto.url}>Start collaborating!</a>
                  </div>
              }



              {
                Meteor.user()?
                <div id="rateProject">
                <h3>Rate this project</h3>
                <ReactStars count={5} onChange={this.props.addRating} size={24} color2={'#637a00'} value={this.props.avgRating} />
                </div>
                :
                <div className="no">
                <ReactStars  count={5} edit={false} size={24} color2={'#637a00'} value={this.props.avgRating} />
                </div>
              }


              {this.props.comments.length>0?<h4>Past reviews</h4>:null}

              <div className="row">

                <Comments eraseComment={this.props.eraseComment} alert={this.props.alert} alertText={this.props.alertText} comments={this.props.comments} saveComment={this.props.saveComment}/>
              </div>

              {
                Meteor.user()?
                <div>
                </div>
                :
                <div>
                  <p>To leave a review or rate this project, use your github user to <a onClick={()=>this.props.login()}>sign in!</a></p>
                </div>
              }

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.modalClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
        );
    }
}

export default PModal;
