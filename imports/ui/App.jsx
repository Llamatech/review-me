/* eslint-disable no-global-assign, no-undef, import/extensions,
import/no-extraneous-dependencies, meteor/no-session, react/jsx-no-bind,
no-useless-escape, react/forbid-proptypes, no-unused-vars */

import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Proyectos from './proyecto/proyectos.jsx';
import Navib from './navbar.jsx';
import About from './about.jsx';
import {Projects} from '../api/projects.js';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            proyectos: this.props.proyectos,
            user: {
                username: 'Guest'
            },
            term: '',
            mine: false
        };
    }

    componentDidMount() {
        Meteor.call('getUserData', (err, res) => {
            if (!err) {
                this.setState({user: res.services.github});
            }
        });
    }

    buscarProyectos(t) {
        this.setState({term: t});
        Session.set('term', t);
    }

    buscarAdv(terms) {
        Session.set('filters', terms);
    }

    logout() {
        Meteor.logout(() => {
            this.setState({
                user: {
                    username: 'Guest'
                }
            });
        });
    }

    eraseProject(projId) {
        Meteor.call('projects.eraseProject', {projId:projId});
    }

    addProject(pr) {
        // Meteor.call('projects.insert', pr);
        const project = pr;
        const url = require('url-parse');

        const urlObj = url(project.url, true);
        const path = urlObj.pathname;
        const routes = path.split('/');
        let owner = routes[1];
        const repo = routes[2];
        const apiEndpoint = 'https://api.github.com/repos/';
        const apiUrl = `${apiEndpoint}${owner}/${repo}`;

        axios.get(apiUrl, {}).then((response) => {
            const body = response.data;
            owner = body.owner;
            project.id = body.id;
            project.name = body.name;
            project.owner = owner.login;
            project.summary = body.description;
            project.webpage = body.homepage;
            project.repo = {
                url: body.html_url,
                fork: body.fork
            };
            let info = body;
            project.parent_repo = '';
            if (body.fork) {
                info = body.parent;
                project.parent_repo = body.parent.owner.html_url;
            }
            project.repo.watchers = info.watchers_count;
            project.repo.forks = info.forks_count;
            project.repo.stars = info.stargazers_count;
            project.repo.language = info.language;
            project.repo.issues = info.open_issues;
            project.comments = [];
            project.ratings = { avgRate: 0, ratings:[]};
            project.user = Meteor.user().services.github.username;
            Meteor.call('projects.insert', {project});
        });
        // .catch((error) => {
        //     error
        // });
    }

    login() {
        const options = {
            requestPermissions: ['email']
        };
        Meteor.loginWithGithub(options, (err) => {
            const user = Meteor.user();
            this.setState({user: user.services.github});
        });
    }

    openMine() {
        this.setState({mine: true});
        Session.set('mine', true);
    }

    backHome() {
        this.setState({mine: false});
        Session.set('mine', false);
    }

    render() {
        return (
            <div className="app">
              <div className="col-md-1" />
              <div className="col-md-10">
                <Navib
                  openMine={this.openMine.bind(this)} backHome={this.backHome.bind(this)}
                  logout={this.logout.bind(this)} login={this.login.bind(this)}
                  buscar={this.buscarProyectos.bind(this)} addProject={this.addProject.bind(this)}
                  buscarAdv={this.buscarAdv.bind(this)} user={this.state.user}
                />
                { !this.state.mine ? <About /> : null }
                <Proyectos login={this.login.bind(this)} eraseProject={this.eraseProject.bind(this)}
                  openMine={this.openMine.bind(this)} backHome={this.backHome.bind(this)}
                  mine={this.state.mine} buscarAdv={this.buscarAdv.bind(this)}
                  proyectos={this.props.proyectosActuales}
                />
              </div>

            </div>
        );
    }
}

App.propTypes = {
    proyectos: PropTypes.array.isRequired,
    proyectosActuales: PropTypes.array.isRequired
};

export default createContainer(() => {
    const sTerm = Session.get('term')
        ? Session.get('term')
        : '';
    let stars = 0;
    let forks = 0;
    let issues = 0;
    let watchers = 0;

    const u = Meteor.user() && Session.get('mine')
        ? Meteor.user().services.github.username
        : '';

    if (Session.get('filters')) {
        stars = Session.get('filters').stars
            ? Number(Session.get('filters').stars)
            : 0;
        forks = Session.get('filters').forks
            ? Number(Session.get('filters').forks)
            : 0;
        issues = Session.get('filters').issues
            ? Number(Session.get('filters').issues)
            : 0;
        watchers = Session.get('filters').watchers
            ? Number(Session.get('filters').watchers)
            : 0;
    }

    const query = {
        $and: [
            {
                $or: [
                    {
                        name: {
                            $regex: `\X*${sTerm}\X*`
                        }
                    }, {
                        summary: {
                            $regex: `\X*${sTerm}\X*`
                        }
                    }, {
                        owner: {
                            $regex: `\X*${sTerm}\X*`
                        }
                    }, {
                        description: {
                            $regex: `\X*${sTerm}\X*`
                        }
                    }
                ]
            }, {
                $and: [
                    {
                        'repo.stars': {
                            $gte: stars
                        }
                    }, {
                        'repo.forks': {
                            $gte: forks
                        }
                    }, {
                        'repo.watchers': {
                            $gte: watchers
                        }
                    }, {
                        'repo.issues': {
                            $gte: issues
                        }
                    }, {
                        user: {
                            $regex: `\X*${u}\X*`
                        }
                    }
                ]
            }
        ]
    };

    const a = {
        proyectos: Projects.find({}).fetch(),
        proyectosActuales: Projects.find(query).fetch()
    };
    return a;
}, App);
