import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Comments from './comments/comments';
import ReactStars from 'react-stars';


class PModal extends React.Component {

  constructor(props){
    super(props);
    console.log(props.comments);
    this.state={
      showModal:false
    }
  }

  modalClose() {
    this.setState({ showModal: false });
  }

  modalOpen() {
    this.setState({ showModal: true });
  }



  render () {
    return(
      <div>

        <Button bsSize="sm" onClick={this.modalOpen.bind(this)}>
          Learn more
        </Button>

        <Modal show={this.state.showModal} onHide={this.modalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title><h2>{this.props.proyecto.name}  <small><a href={"https://github.com/"+this.props.proyecto.owner}>{this.props.proyecto.owner}</a></small></h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Description</h3>
            <p>{this.props.proyecto.description}</p>

            <hr />

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
                <div className="row">
                  <div className="col-md-12">
                    <h4>Webpage: <a href={this.props.proyecto.webpage}><small>{this.props.proyecto.webpage}</small></a></h4>
                  </div>
                </div>
              }
              <hr/>
              <h3>Owner's prefered collaborator profile</h3>
              {this.props.proyecto.collaborator &&
                  <p>{this.props.proyecto.collaborator}</p>
              }
              <a href={this.props.proyecto.url}>Start collaborating!</a>
              <h3>Rate this project</h3>

              <ReactStars count={5} onChange={this.props.addRating} size={24} color2={'#93c54b'} value={this.props.avgRating} />

              <h4>Past reviews</h4>
              <div className="row">

                <Comments alert={this.props.alert} comments={this.props.comments} saveComment={this.props.saveComment}/>
              </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.modalClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default PModal;
