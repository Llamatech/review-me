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
    this.state = {
      proyectos: this.props.proyectos,
      user:{'username':'Guest'},
      term:""
    }

  }

  buscarProyectos(t){
    this.setState({term:t});
    Session.set('term', t);

    Meteor.call('projects.search', t, (err, res)=>{
      console.log(res);
      this.setState({
        proyectos: []
      });
      console.log(this.state.proyectos)
    });
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
    this.setState({proyectos:this.props.projects})
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
    var url = require('url-parse');

    var urlObj = url(project.url, true);
    var path = urlObj.pathname;
    console.log(path);
    var routes = path.split('/');
    var owner = routes[1];
    var repo = routes[2];
    var apiEndpoint = 'https://api.github.com/repos/';
    var apiUrl = apiEndpoint+owner+"/"+repo;
    console.log(apiUrl);
    var config = {
      headers: {
          'User-Agent': 'request'
      }
    };

    axios.get(apiUrl,config).then(response=>{
      console.log("giiit");
      console.log(response)
      var body = response.data;
      var owner = body.owner;
      project.id = body.id;
      project.name = body.name;
      project.owner = owner.login;
      project.summary = body.description;
      project.webpage = body.homepage;
      project.repo = {
          url: body.html_url,
          fork: body.fork
      };
      var info = body;
      project.parent_repo = "";
      if(body.fork) {
          info = body.parent;
          project.parent_repo = body.parent.owner.html_url;
      }
      project.repo.watchers = info.watchers_count;
      project.repo.forks = info.forks_count;
      project.repo.stars = info.stargazers_count;
      project.repo.language = info.language;
      project.repo.issues = info.open_issues;
      project.comments = [];
      project.ratings=[0,0];
      project.user = Meteor.user().services.github.username;
      console.log(project);
      Meteor.call('projects.insert', project);
    }).catch(function (error) {
      console.log("que putitas");
      console.log(error);
    });
  }

  login() {
    console.log("Login with Github");
    options = {
      requestPermissions: [ 'email' ]
    }
    console.log(Meteor.user())
    Meteor['loginWithGithub'](options, (err) => {
        console.log(err);
        var user = Meteor.user();
        console.log(user.services.github.username);
        this.setState({
          user: user.services.github
        })
    });
  }

  help(){
    this.state.proyectos=this.props.proyectos;
    console.log(this.props.proyectos);
  }

  changeName(){
    var user = Meteor.user();
    console.log(user);
    while(true){
      console.log(user);
      user = Meteor.user();
      if (typeof user!=='undefined'){
        break;
      }
    }
  }

  render(){
    return(
      <div>

        <Navib login={this.login.bind(this)} buscar={this.buscarProyectos.bind(this)} addProject={this.addProject.bind(this)} buscarAdv={this.buscarAdv.bind(this)} user={this.state.user}/>
        <About/>
          {this.help()}
          {console.log(this.state.proyectos)}
          {console.log(this.props.proyectos)}
        <Proyectos buscarAdv={this.buscarAdv.bind(this)} proyectos={this.state.proyectos}/>

      </div>

    )

  }
}

App.propTypes = {
  proyectos: PropTypes.array.isRequired,
};

export default createContainer(() => {
  console.log(typeof Session!=='undefined'?Session.get('selectedCategory'):"not yet");
  var a = {
    proyectos: Projects.find(
      {}
    ).fetch(),
  };
  console.log(a);
  return a;
}, App);
