import React, { PropTypes } from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, FormGroup, FormControl, Button, Modal } from 'react-bootstrap';
import PForm from './proyForm'


class Navib extends React.Component {
  buscar(term){
    this.props.buscar(term);
    //aqui se llama para atras a lo que llame a la db
  }

  constructor(props){
    super(props);
    this.state={
      showModal:false,
      showSearch:false,
      alert:false
    }
  }

  modalClose() {
    this.setState({ showModal: false });
  }

  modalOpen() {
    if(Meteor.user()){
      this.setState({ showModal: true });
    }
    else{
      this.setState({alert:true});
    }
  }

  close(){
      this.setState({alert:false});
  }

  searchClose() {
    this.setState({ showSearch: false });
  }

  searchOpen() {
    this.setState({ showSearch: true });
  }


  render () {
    return(
      <div>
        <Navbar collapseOnSelect className="navbar-fixed-top">
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={()=>this.props.backHome()}><img src="https://68.media.tumblr.com/024cf54439d1a61124ce6ab1436174c2/tumblr_omb3fcuptx1qh8q8mo1_400.png" width="10px" style={{float:"left","marginRight":"5px"}}></img>   Review Me</a>
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
              {Meteor.user()?null:<Button type="button" onClick={() => this.props.login()}><i className="fa fa-github"></i> Login with Github</Button>}
            </Navbar.Form>
            {Meteor.user()?
            <Nav>
            <NavDropdown title={Meteor.user().services.github.username} id="basic-nav-dropdown" className="newProj">
              <MenuItem onClick={()=>this.props.openMine()}>My projects</MenuItem>
              <MenuItem divider />
              <MenuItem onClick={() => this.props.logout()}>Logout</MenuItem>
            </NavDropdown>
          </Nav>:null
          }
          </Navbar.Collapse>
        </Navbar>
        <PForm show={this.state.showModal} modalClose={this.modalClose.bind(this)} addProject={this.props.addProject}></PForm>
        <Modal show={this.state.alert} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            You must be logged in to add a new project
          </Modal.Header>

        </Modal>
      </div>
    )
  }
}

export default Navib;
