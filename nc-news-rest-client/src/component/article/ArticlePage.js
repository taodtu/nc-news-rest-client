import React, { Component } from 'react';
import { getArticle } from '../api';
import Article from './Article';
import CommentList from '../comment/CommentList'


// import AddComment from '../comment/AddComment';
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
    const { id, currentUser } = this.props;
    const { loading, error, article } = this.state;
    return (
      <div>
        {loading && <p>...Loading</p>}
        {error && <p>error: {error}</p>}
        <h4>Article (id:{id}) and Comments </h4>
        <Article {...article} />
        <hr />
        <CommentList id={id} currentUser={currentUser} />
        <hr />
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      ...this.state,
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