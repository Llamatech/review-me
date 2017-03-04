import React, { PropTypes } from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, FormGroup, FormControl, Button } from 'react-bootstrap';
import PForm from './proyForm'

class Navib extends React.Component {
  buscar(term){
    console.log(term);
    //aqui se llama para atras a lo que llame a la db
  }

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
        <Navbar collapseOnSelect className="navbar-fixed-top">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Review Me</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={this.modalOpen.bind(this)}>Add new project</NavItem>
            </Nav>
            <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl type="text" placeholder="Search" onChange={(event) => this.buscar(event.target.value)}/>
        </FormGroup>
        {' '}
        <Button type="submit">Submit</Button>
      </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <PForm show={this.state.showModal} modalClose={this.modalClose.bind(this)}></PForm>
      </div>
    )
  }
}

export default Navib;
