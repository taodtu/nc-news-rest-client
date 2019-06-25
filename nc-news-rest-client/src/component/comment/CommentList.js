import React, { Component } from 'react';
import Comment from '../comment/Comment';
import { getCommentsByArticle } from '../api';
import VoteUp from '../button/VoteUp';
import VoteDown from '../button/VoteDown';

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
        {comments && comments.map(comment => {
          return (
            <div>
              <Comment key={comment.comment_id} {...comment}>
                <div className="vote"><VoteUp handleClick={this.handleClickUp} /></div>
                <div className="vote"><VoteDown handleClick={this.handleClickDown} /></div>
              </Comment>
            </div>
          )
        })}
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