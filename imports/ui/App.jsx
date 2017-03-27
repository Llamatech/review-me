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
  }

  buscarAdv(terms){
    console.log(terms);
    Session.set('filters',terms);

  }

  componentDidMount() {
    Meteor.call('getUserData', (err, res) => {
      if(err) {
        alert(err)
      }
      else {
        console.log(res);
        this.setState({
          user: res.services.github
        });
      }
    })
  }

  getProyectos(){
    console.log(this.props.proyectos)
    console.log(this.state.proyectos)
    this.setState({proyectos:this.props.projects})
  }

  logout() {
      Meteor.logout(() =>{
        this.setState({
            user:{'username':'Guest'}
        });
      });
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

        <Navib logout={this.logout.bind(this)} login={this.login.bind(this)} buscar={this.buscarProyectos.bind(this)} addProject={this.addProject.bind(this)} buscarAdv={this.buscarAdv.bind(this)} user={this.state.user}/>
        <About/>
        <Proyectos buscarAdv={this.buscarAdv.bind(this)} proyectos={this.props.proyectosActuales}/>

      </div>

    )

  }
}

App.propTypes = {
  proyectos: PropTypes.array.isRequired,
};

export default createContainer(() => {
  console.log(Session.get('term'));
  var sTerm = Session.get('term')?Session.get('term'):'';
  var stars=0;
  var forks=0;
  var issues=0;
  var watchers=0;

  if(Session.get('filters')){
    stars =Session.get('filters').stars ? Number(Session.get('filters').stars) : 0;
    forks = Session.get('filters').forks ? Number(Session.get('filters').forks) : 0;
    issues = Session.get('filters').issues ? Number(Session.get('filters').issues) : 0;
    watchers = Session.get('filters').watchers ? Number(Session.get('filters').watchers) : 0;
  }

  var query =
  {$and:[
    {
      $or: [
          {name:{'$regex':'\X*'+sTerm+'\X*'}},
          {summary:{'$regex':'\X*'+sTerm+'\X*'}},
          {owner:{'$regex':'\X*'+sTerm+'\X*'}}
      ]
    },
    {
      $and:
      [
        {"repo.stars": {$gte:stars}},
        {"repo.forks": {$gte:forks}},
        {"repo.watchers": {$gte:watchers}},
        {"repo.issues": {$gte:issues}}
      ]
    }
  ]}

    console.log(query);
  var a = {
    proyectos: Projects.find({}).fetch(),
    proyectosActuales: Projects.find(query).fetch()
  };
  console.log(a);
  return a;
}, App);
