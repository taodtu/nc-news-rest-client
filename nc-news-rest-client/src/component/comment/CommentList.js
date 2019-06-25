import React, { Component } from 'react';
import Comment from '../comment/Comment';
import { getCommentsByArticle, deleteComment, addComment } from '../api';
import DeleteComment from '../button/DeleteComment';
import AddComment from './AddComment'

const INITIAL_STATE = {
  comments: null,
  error: '',
  loading: false,
}

class CommentList extends Component {
  state = {
    ...INITIAL_STATE
  }
  handleSubmit = (text) => {
    const { id, currentUser } = this.props;
    addComment(id, { username: currentUser, body: text })
      .then(comment => {
        this.setState({
          ...this.state,
          comments: [comment, ...this.state.comments]
        })
      })
      .catch(error => {
        this.setState({
          ...INITIAL_STATE,
          error,
        })
      })
  }
  render() {
    const { comments } = this.state;
    const { id } = this.props;
    return (
      <div>
        <AddComment onSubmit={this.handleSubmit} />
        {comments && comments.map(comment => <Comment key={comment.comment_id} {...comment}>
          <DeleteComment article_id={id} comment_id={comment.comment_id} />
        </Comment>)
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