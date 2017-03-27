import React, { PropTypes } from 'react';
import { Well } from 'react-bootstrap';


class Comment extends React.Component {
  render () {
    return(
      <div>
        <Well bsSize="small">
        {this.props.text}
        </Well>
      </div>
    )
  }
}

export default Comment;
