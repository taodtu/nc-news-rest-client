import React, { Component } from 'react';
import Comment from '../comment/Comment';
import { deleteComment, addComment } from '../api';
import DeleteComment from '../button/DeleteComment';
import AddComment from './AddComment';
import Error from '../error/Error';
import SortSelect from '../button/SortSelect';
import OrderSelect from '../button/OrderSelect';

const INITIAL_STATE = {
  comments: null,
  error: '',
  loading: false,
  sort_by: 'created_at',
  order: 'desc'
}
const SORT_CHART = {
  "created_at": 'date',
  'date': "created_at",
  "id": "comment_id",
  "comment_id": "id",
  "votes": "votes",
  "author": "author"
}
class CommentList extends Component {
  state = {
    ...INITIAL_STATE
  }
  render() {
    const { comments, loading, error, sort_by, order } = this.state;
    if (error) return <Error error={error} />
    return (
      <div>
        <AddComment onSubmit={this.handleSubmit} />
        {loading && <p>...loading</p>}
        <div className="article-sort-order">
          <SortSelect onChange={this.handleSortChange} sortValue={SORT_CHART[sort_by]} />
          <OrderSelect onChange={this.handleOrderChange} orderValue={order} />
        </div>
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
    this.props.getComments(this.props.id)
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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by
      || prevState.order !== this.state.order
    ) {
      this.setState({
        ...this.state,
        loading: true
      });
      this.props.getComments(this.props.id, this.state.sort_by, this.state.order)
        .then(comments => {
          this.setState(prev => ({
            ...prev,
            loading: false,
            comments,
          }))
        })
        .catch(error => {
          this.setState({
            ...INITIAL_STATE,
            error,
          })
        })
    }
  }
  handleSortChange = ({ target }) => {
    const { value } = target;
    this.setState(prev => ({
      ...prev,
      sort_by: SORT_CHART[value]
    }))
  }
  handleOrderChange = ({ target }) => {
    const { value } = target;
    this.setState(prev => ({
      ...prev,
      order: value
    }))
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
}

export default CommentList;