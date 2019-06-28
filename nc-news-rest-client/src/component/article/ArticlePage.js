import React, { Component } from 'react';
import { getArticle, getCommentsByArticle } from '../api';
import Article from './Article';
import CommentList from '../comment/CommentList';
import AddComment from '../comment/AddComment';
import ErrorMsg from '../error/Error';
import { UserContext } from '../UserContext';

const INITIAL_STATE = {
  article: null,
  error: '',
  loading: false
}
class ArticlePage extends Component {
  state = {
    ...INITIAL_STATE
  }

  render() {
    const { id } = this.props;
    const { loading, error, article } = this.state;
    if (error) return <ErrorMsg error={error} />
    return (
      <div>
        {loading && <p>...loading</p>}
        <h3>Article and Its Comments </h3>
        {article && <Article {...article} />}
        <hr />
        <UserContext.Consumer>
          {value => <CommentList id={id} currentUser={value} getComments={getCommentsByArticle}
            render={handleSubmit => <AddComment onSubmit={handleSubmit} />}
          />}
        </UserContext.Consumer>
        <hr />
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      ...INITIAL_STATE,
      loading: true
    });
    getArticle(this.props.id)
      .then(article => {
        this.setState({
          ...INITIAL_STATE,
          article,
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

export default ArticlePage;