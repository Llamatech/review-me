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
              <a href="#"><img src="https://68.media.tumblr.com/024cf54439d1a61124ce6ab1436174c2/tumblr_omb3fcuptx1qh8q8mo1_400.png" width="10px" style={{float:"left","marginRight":"5px"}}></img>   Review Me</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem className="newProj" onClick={this.modalOpen.bind(this)}>
                <i className="fa fa-plus fa-lg fa-inverse "></i>    Add new project
              </NavItem>
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
