import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleItem from './ArticleItem';

const INITIAL_STATE = {
  articles: null,
  error: '',
  loading: false
}

class ArticleList extends Component {
  state = {
    ...INITIAL_STATE
  }

  render() {
    const { articles, loading, error } = this.state
    return (
      <div>
        {loading && <p>...Loading</p>}
        {error && <p>error: {error}</p>}
        {articles && articles.map(article => <ArticleItem key={article.article_id} article={article} />)}
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      loading: true
    });
    getArticles(this.props.topic, this.props.author)
      .then(({ articles }) => {
        this.setState({
          ...INITIAL_STATE,
          articles,
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
    if (prevProps.topic !== this.props.topic
      || prevProps.author !== this.props.author) {
      getArticles(this.props.topic, this.props.author)
        .then(({ articles }) => {
          this.setState({
            ...INITIAL_STATE,
            articles,
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
}

export default ArticleList;