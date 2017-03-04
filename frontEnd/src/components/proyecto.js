import React, { PropTypes } from 'react';
import { Well } from 'react-bootstrap';


//{this.props.proyecto.LOQUEDESEAS}
class Proyecto extends React.Component {

  constructor(props){
    super(props);
    this.state={
      modal:false
    }
  }

  modalClose() {
    this.setState({ modal: false });
  }

  modalOpen() {
    this.setState({ modal: true });
  }
  render () {
    return(
      <div className="proyecto">

        <Well bsSize="lg">
          <div className = "">
            <div className = "row text-center">
              <h2>{this.props.proyecto.name}</h2>
              <h5>{this.props.proyecto.author}</h5>
            </div>

            <div className = "row text-center">
              <a href={this.props.proyecto.repo.url}><h5><i className="fa fa-github fa-2x" aria-hidden="true"></i> Repo</h5></a>
            </div>
            <div className="row">
              <div className ="col-md-4">
                <h6><i className="fa fa-code-fork fa-lg" aria-hidden="true"></i> Forks: {this.props.proyecto.repo.forks}</h6>
              </div>
              <div className ="col-md-4">
                <h6><i className="fa fa-star fa-lg" aria-hidden="true"></i> Stars: {this.props.proyecto.repo.stars}</h6>
              </div>
              <div className ="col-md-4">
                <h6><i className="fa fa-eye fa-lg" aria-hidden="true"></i> Watches: {this.props.proyecto.repo.watches}</h6>
              </div>
            </div>
            <div className="row text-center">
              <a>Learn more</a>
            </div>
          </div>
        </Well>
      </div>
    )
  }
}

export default Proyecto;
