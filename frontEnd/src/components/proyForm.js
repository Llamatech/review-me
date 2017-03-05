import React, { PropTypes } from 'react';
import { Button, Modal, NavItem } from 'react-bootstrap';


class PForm extends React.Component {



  render () {
    return(
      <div>

        <Modal show={this.props.show} onHide={()=>this.props.modalClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>

          </Modal.Body>
          <Modal.Footer>
            <a onClick={()=>this.props.modalClose()}>Close</a>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default PForm;
