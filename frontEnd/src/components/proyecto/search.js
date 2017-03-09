import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';


class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        forks:'',
        stars:'',
        watchers:'',
        issues:''
    }
  }

  forks(event){
    this.setState({forks:event.target.value})
    var body = {
        "forks":this.state.forks,
        "stars":this.state.stars,
        "watchers":this.state.watchers,
        "issues":this.state
    }
    this.props.buscarAdv(body);
  }

  stars(event){
    this.setState({stars:event.target.value})
    var body = {
        "forks":this.state.forks,
        "stars":this.state.stars,
        "watchers":this.state.watchers,
        "issues":this.state
    }
    this.props.buscarAdv(body);
  }

  watchers(event){
    this.setState({watchers:event.target.value})
    var body = {
        "forks":this.state.forks,
        "stars":this.state.stars,
        "watchers":this.state.watchers,
        "issues":this.state
    }
    this.props.buscarAdv(body);
  }

  issues(event){
    this.setState({issues:event.target.value})
    var body = {
        "forks":this.state.forks,
        "stars":this.state.stars,
        "watchers":this.state.watchers,
        "issues":this.state
    }
    this.props.buscarAdv(body);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3 text-center minimum">
            <label><i className="fa fa-code-fork fa-lg" aria-hidden="true"></i> Minimum Forks:</label>
            <input className="form-control" type="text" value={this.state.forks} onChange={this.forks.bind(this)}></input>
        </div>
        <div className="col-md-3 text-center minimum">
            <label><i className="fa fa-star fa-lg" aria-hidden="true"></i> Minimum Stars:</label>
            <input className="form-control" type="text" value={this.state.stars} onChange={this.stars.bind(this)}></input>
        </div>
        <div className="col-md-3 text-center minimum">
            <label><i className="fa fa-eye fa-lg" aria-hidden="true"></i> Minimum Watchers:</label>
            <input className="form-control" type="text" value={this.state.watchers} onChange={this.watchers.bind(this)}></input>
        </div>
        <div className="col-md-3 text-center minimum">
            <label><i className="fa fa-exclamation-circle fa-lg" aria-hidden="true"></i> Minimum Issues:</label>
            <input className="form-control" type="text" value={this.state.issues} onChange={this.issues.bind(this)}></input>
        </div>
      </div>
    );
  }
}

export default Search;
