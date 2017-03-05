import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, HelpBlock  } from 'react-bootstrap';


class PForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      curComment: ''
    }
  }

  checkGithub(){

  }



  render () {
    return(
      <div>

        <Modal show={this.props.show} onHide={()=>this.props.modalClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText" validationState={this.checkGithub()}>
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>
              <FormGroup>
                  <Button type="submit">
                    Sign in
                  </Button>
              </FormGroup>
            </form>

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
