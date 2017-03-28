import React, { PropTypes } from 'react';
import { Well, Button } from 'react-bootstrap';
import PModal from './proyModal';
import ReactStars from 'react-stars';
import axios from 'axios';




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
      alert:false,
      alertText:""
    }
  }

  addRating(newRate){
    if(Meteor.user()){
      Meteor.call('projects.addRating', this.props.proyecto._id, newRate, (err,res)=>{
        this.setState({
          avgRating: this.props.proyecto.ratings[0]
              });
      });
    }
    else{
      this.setState({
        avgRating: this.props.proyecto.ratings[0]
            });
    }

  }

  eraseComment(commId){
    console.log("no")
    console.log(commId);
    Meteor.call('projects.removeComment', this.props.proyecto._id, commId,(err, res)=>{
      console.log(res);
      this.setState({
        comments:this.props.proyecto.comments
      })
    });
  }

  saveComment(text){
    if(text.length<5){
      this.setState({
        alert:true,
        alertText:"Comments should be longer than 5 characters!"
      });
    }
    else if(!Meteor.user()){
      this.setState({
        alert:true,
        alertText:"You have to be logged in to comment"
      });
    }
    else{
      Meteor.call('projects.addComment', this.props.proyecto._id, text, (err,res)=>{
        this.setState({
          comments: this.props.proyecto.comments,
          alert:false
        })
      });

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
              <PModal eraseComment={this.eraseComment.bind(this)} alert={this.state.alert} alertText={this.state.alertText} proyecto={this.props.proyecto} addRating={this.addRating.bind(this)} avgRating={this.state.avgRating} comments={this.state.comments} saveComment={this.saveComment.bind(this)}/>
            </div>
            {
              Meteor.user()&&Meteor.user().services.github.username===this.props.proyecto.user?
              <div className = "row text-center">
                <br></br>
                <Button bsSize="sm" onClick={()=>this.props.eraseProject(this.props.proyecto._id)}>Delete this project</Button>
              </div>
              :null
            }

          </div>
        </Well>
      </div>
    )
  }
}

export default Proyecto;
