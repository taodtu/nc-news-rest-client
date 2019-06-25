import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleItem from './ArticleItem';
import Error from '../error/Error'

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
    if (error) return <Error error={error} />
    return (
      <div>
        {loading && <p>...Loading</p>}
        {articles && articles.map(article => <ArticleItem key={article.article_id} article={article} />)}
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      loading: true
    });
    this.fetchArticles()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic
      || prevProps.author !== this.props.author) {
      this.fetchArticles();
    }
  }
  fetchArticles = () => {
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
}

export default ArticleList;