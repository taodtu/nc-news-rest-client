import React, { Component } from 'react';
import Comment from '../comment/Comment';
import { getCommentsByArticle, updateComment } from '../api';

const INITIAL_STATE = {
  comments: null,
  error: '',
  loading: false
}

class CommentList extends Component {
  state = {
    ...INITIAL_STATE
  }
  render() {
    const { comments } = this.state;
    return (
      <div>
        {comments && comments.map(comment => <Comment key={comment.comment_id} {...comment} />)
        }
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      loading: true
    });
    getCommentsByArticle(this.props.id)
      .then(comments => {
        this.setState({
          ...INITIAL_STATE,
          comments,
        })
      })
      .catch(error => {
        this.setState({
          ...INITIAL_STATE,
          error,
        })
      })
  }
}

export default CommentList;