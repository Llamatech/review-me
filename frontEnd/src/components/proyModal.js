import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';


class PModal extends React.Component {

  constructor(props){
    super(props);
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
            <Modal.Title>{this.props.proyecto.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>

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
