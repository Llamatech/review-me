import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import Proyectos from './proyecto/proyectos';
import Navib from './navbar';
import About from './about';
import axios from 'axios';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '../api/projects.js';


class App extends Component {

  constructor(props) {
    super(props);
    var user = Meteor.user();
    console.log(user);
    this.state = {
      proyectos: [],
      user:{'username':'Guest'}
    }
  }

  buscarProyectos(term){

    axios.get(process.env.BACK_URL+ "/projects",{
      params:{
        "term":term
      }
    })
    .then(response => {
      console.log(response);
      this.setState({
        proyectos: response.data.projects
      })
    })
  }

  buscarAdv(terms){
    console.log(terms);
    axios.get(process.env.BACK_URL+"/projects",{params:terms})
    .then(response=>{
      this.setState({
        proyectos: response.data.projects
      })
    })
  }

  getProyectos(){
    console.log(this.props.proyectos)
    console.log(this.state.proyectos)
//    this.setState({proyectos:this.state.projects})
    // console.log(process.env.BACK_URL)
    // axios.get(process.env.BACK_URL+ "/projects")
    // .then(response => {
    //   console.log(response);
    //   this.setState({
    //     proyectos: response.data.projects
    //   })
    // })
  }

  addProject(project){
    Projects.insert(project)
  }

  login() {
    console.log("Login with Github");
    options = {
      requestPermissions: [ 'email' ]
    }
    Meteor['loginWithGithub'](options, (err) => {
        console.log(err);
        var user = Meteor.user();
        console.log(user.services.github.username);
        this.setState({
          user: user.services.github
        })
    });
  }

  render(){
    return(
      <div>
        {this.getProyectos()}
        <Navib login={this.login.bind(this)} buscar={this.buscarProyectos.bind(this)} addProject={this.addProject.bind(this)} buscarAdv={this.buscarAdv.bind(this)} user={this.state.user}/>
        <About/>
        <Proyectos buscarAdv={this.buscarAdv.bind(this)} proyectos={this.props.proyectos}/>
      </div>
    )

  }
}

App.propTypes = {
  proyectos: PropTypes.array.isRequired,
};

export default createContainer(() => {
  var a = {
    proyectos: Projects.find({}).fetch(),
  };
  console.log(a);
  return a;
}, App);
