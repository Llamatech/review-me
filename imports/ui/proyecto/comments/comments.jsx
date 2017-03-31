import React, { PropTypes } from 'react'
import Comment from './comment'

class Comments extends React.Component {

  constructor(props){
    super(props);
    this.state={
      curComment: ''
    }
  }

  cleanComment(evt){
    evt.preventDefault();
    this.props.saveComment(this.state.curComment);
    this.setState({curComment:""});
  }



  render () {
    return(
      <div>
        {this.props.comments && this.props.comments.map(comentario=>{
          return(
            <div className="col-md-12">
              <Comment eraseComment={this.props.eraseComment} comentario={comentario} />
            </div>
          )
        })}
        {Meteor.user()?
          <div>
        <div className="col-md-12">
        <h4>   Give a constructive review!</h4>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-2">
            {this.props.alert &&
              <div className="alert alert-danger" role="alert">
                <strong>Warning!</strong> {this.props.alertText}
              </div>
            }
          </div>
        </div>

          <div className="col-md-12">

            <form  onSubmit={this.cleanComment.bind(this)}>
              <textarea aria-label="Write a constructive review" className="form-control" rows="3" value={this.state.curComment} type="text" onChange={(event)=>
                this.setState({curComment: event.target.value})
              }/>
            <br></br>
              <button type="submit" className="btn btn-default btn-sm">Submit</button>
            </form>
        </div>
        </div>
        :null
      }
      </div>
    )
  }
}

export default Comments;
