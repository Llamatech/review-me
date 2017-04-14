/* eslint-disable no-undef,
 no-unused-vars */
import React, {PropTypes} from 'react';

class AdvSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forks: '',
            stars: '',
            watchers: '',
            issues: ''
        };
    }

    forks(value) {
        this.setState({
            forks: value
        }, () => {
            var body = {
                'forks': this.state.forks,
                'stars': this.state.stars,
                'watchers': this.state.watchers,
                'issues': this.state.issues
            };
            this.props.buscarAdv(body);
        });
    }

    stars(value) {
        this.setState({
            stars: value
        }, () => {
            var body = {
                'forks': this.state.forks,
                'stars': this.state.stars,
                'watchers': this.state.watchers,
                'issues': this.state.issues
            };
            this.props.buscarAdv(body);
        });
    }

    watchers(value) {
        this.setState({
            watchers: value
        }, () => {
            var body = {
                'forks': this.state.forks,
                'stars': this.state.stars,
                'watchers': this.state.watchers,
                'issues': this.state.issues
            };
            this.props.buscarAdv(body);
        });
    }

    issues(value) {
        this.setState({
            issues: value
        }, () => {
            var body = {
                'forks': this.state.forks,
                'stars': this.state.stars,
                'watchers': this.state.watchers,
                'issues': this.state.issues
            };
            this.props.buscarAdv(body);
        });
    }

    render() {
        return (

            <div className="row linea">
                <div className="col-md-3 text-center minimum">
                    <label>
                        <i className="fa fa-code-fork fa-lg" aria-hidden="true"></i>
                        Minimum Forks:</label>

                    <input aria-label="Minimum forks" className="form-control" type="text" value={this.state.forks} onChange={(event) => this.forks(event.target.value)}></input>
                </div>
                <div className="col-md-3 text-center minimum">
                    <label>
                        <i className="fa fa-star fa-lg" aria-hidden="true"></i>
                        Minimum Stars:</label>

                    <input aria-label="Minimum stars" className="form-control" type="text" value={this.state.stars} onChange={(event) => this.stars(event.target.value)}></input>
                </div>
                <div className="col-md-3 text-center minimum">
                    <label>
                        <i className="fa fa-eye fa-lg" aria-hidden="true"></i>
                        Minimum Watchers:</label>

                    <input aria-label="Minimum watchers" className="form-control" type="text" value={this.state.watchers} onChange={(event) => this.watchers(event.target.value)}></input>
                </div>
                <div className="col-md-3 text-center minimum">
                    <label>
                        <i className="fa fa-exclamation-circle fa-lg" aria-hidden="true"></i>
                        Minimum Issues:</label>

                    <input aria-label="Minimum Issues" className="form-control" type="text" value={this.state.issues} onChange={(event) => this.issues(event.target.value)}></input>
                </div>
            </div>

        );
    }
}

export default AdvSearch;
