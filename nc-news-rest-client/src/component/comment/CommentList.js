import React, { Component } from 'react';
import Comment from '../comment/Comment';
import { getCommentsByArticle, deleteComment, addComment } from '../api';
import DeleteComment from '../button/DeleteComment';
import AddComment from './AddComment';
import Error from '../error/Error'

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
          ...this.state,
          error,
        })
      })
  }
  handleDelete = (id, author) => {
    const { currentUser } = this.props;
    const { comments } = this.state;
    currentUser !== author
      ? alert('Author can only delete comment made by him/her, please change the current author to delete the comment')
      : deleteComment(id)
        .then(res => {
          if (res.status === 204) {
            this.setState({
              ...this.state,
              comments: comments.filter(comment => comment.comment_id !== id)
            })
          }
        })
        .catch(error => {
          this.setState({
            ...this.state,
            error,
          })
        })
  }
  render() {
    const { comments, loading, error } = this.state;
    if (error) return <Error error={error} />
    return (
      <div>
        <AddComment onSubmit={this.handleSubmit} />
        {loading && <p>...loading</p>}
        {comments && comments.map(comment => <Comment key={comment.comment_id} {...comment}>
          <DeleteComment comment_id={comment.comment_id} handleDelete={this.handleDelete} author={comment.author} />
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