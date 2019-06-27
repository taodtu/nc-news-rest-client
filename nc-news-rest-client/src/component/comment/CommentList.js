import React, { Component } from 'react';
import Comment from '../comment/Comment';
import { deleteComment, addComment } from '../api';
import DeleteComment from '../button/DeleteComment';
import Error from '../error/Error';
import ToggleButton from '../button/ToggleButton';
import SortSelect from '../button/SortSelect';
import { COMMENT_SORT_CHART } from '../constant';

const INITIAL_STATE = {
  comments: null,
  error: '',
  loading: false,
  sort_by: 'created_at',
  order: 'desc'
}

class CommentList extends Component {
  state = {
    ...INITIAL_STATE
  }
  render() {
    const { comments, loading, error, sort_by } = this.state;
    if (error) return <Error error={error} />
    return (
      <div>
        {this.props.render && this.props.render(this.handleSubmit)}
        {loading && <p>...loading</p>}
        <div className="article-sort-order">
          <SortSelect onChange={this.handleSortChange} sortValue={COMMENT_SORT_CHART[sort_by]} />
          <ToggleButton left={"desc"} right={"asc"} onClick={this.handleToggle} />
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
      sort_by: COMMENT_SORT_CHART[value]
    }))
  }
  handleToggle = (order) => {
    order === "desc"
      ? this.setState(prev => ({
        ...prev,
        order: "desc"
      }))
      : this.setState(prev => ({
        ...prev,
        order: "asc"
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