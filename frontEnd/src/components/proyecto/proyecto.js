import React, { PropTypes } from 'react';
import { Well, Button } from 'react-bootstrap';
import PModal from './proyModal';
import ReactStars from 'react-stars';
import axios from 'axios';




//{this.props.proyecto.LOQUEDESEAS}
class Proyecto extends React.Component {

  constructor(props){
    super(props);
    var rating = 0;
    if(props.proyecto.ratings){
      rating=props.proyecto.ratings[0]
    }
    this.state={
      avgRating:rating,
      comments:props.proyecto.comments,
      alert:false
    }
  }

  addRating(newRate){
    axios.post(process.env.BACK_URL+ "/ratings",{
      "id":this.props.proyecto.id,
      "rating":newRate
    })
    .then(response => {
      console.log(response);
      this.setState({avgRating:response.data.rating[0].avgRating});
    })

  }

  saveComment(text){
    if(text.length<5){
      this.setState({alert:true});
    }else{
      axios.post(process.env.BACK_URL+ "/comments",{
        "project":this.props.proyecto.id,
        "text":text
      })
      .then(response => {
        console.log(response);
        this.setState({
          comments: response.data,
          alert:false
        })
      })

    }
  }

  render () {
    return(
      <div className="proyecto">

        <Well bsSize="lg">
          <div className = "">
            <div className = "row text-center">
              <h2>{this.props.proyecto.name}</h2>
              <h5>{this.props.proyecto.owner}</h5>
            </div>

            {this.props.proyecto.summary &&
              <div className = "row text-center">
                <p>{this.props.proyecto.summary}</p>
              </div>
            }
            <div className = "row text-center">
              <a href={this.props.proyecto.url} target="_blank"><h5><i className="fa fa-github fa-2x" aria-hidden="true"></i> Repo</h5></a>
            </div>
            <div className="row">
              <div className ="col-md-4">
                <h6><i className="fa fa-code-fork fa-lg" aria-hidden="true"></i>  Forks: {this.props.proyecto.repo.forks}</h6>
              </div>
              <div className ="col-md-4">
                <h6><i className="fa fa-star fa-lg" aria-hidden="true"></i> Stars: {this.props.proyecto.repo.stars}</h6>
              </div>
              <div className ="col-md-4">
                <h6>
                  <i className="fa fa-eye fa-lg" aria-hidden="true"></i> Watches: {this.props.proyecto.repo.watchers}
                </h6>
              </div>
            </div>
            <div className="row text-center">
              <ReactStars count={5} size={24} color2={'#93c54b'} edit={false} value={this.state.avgRating}/>
            </div>
            <div className="row text-center">
              <br></br>
              <PModal alert={this.state.alert} proyecto={this.props.proyecto} addRating={this.addRating.bind(this)} avgRating={this.state.avgRating} comments={this.state.comments} saveComment={this.saveComment.bind(this)}/>
            </div>
          </div>
        </Well>
      </div>
    )
  }
}

export default Proyecto;
