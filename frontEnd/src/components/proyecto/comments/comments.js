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
              <Comment text={comentario}/>
          )
        })}
        <form onSubmit={this.cleanComment.bind(this)}>
          <input value={this.state.curComment} type="text" onChange={(event)=>
            this.setState({curComment: event.target.value})
          }/>
        </form>
      </div>
    )
  }
}

export default Comments;
