import React, { PropTypes } from 'react'

class Comment extends React.Component {
  render () {
    return(
      <div>
        {this.props.text}
      </div>
    )
  }
}

export default Comment;
