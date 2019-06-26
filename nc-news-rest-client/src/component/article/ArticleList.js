import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleItem from './ArticleItem';
import Error from '../error/Error'
import SortSelect from '../button/SortSelect';

const INITIAL_STATE = {
  articles: null,
  error: '',
  loading: false,
  sort_by: 'created_at',
  order: 'desc'
}

const SORT_CHART = {
  "created_at": 'date',
  'date': "created_at",
  "id": "article_id",
  "article_id": "id",
  "votes": "votes",
  "author": "author"
}

class ArticleList extends Component {
  state = {
    ...INITIAL_STATE
  }
  handleSortChange = ({ target }) => {
    const { value } = target;
    this.setState(prev => ({
      ...prev,
      sort_by: SORT_CHART[value]
    }))
  }
  render() {
    const { articles, loading, error, sort_by, order } = this.state
    if (error) return <Error error={error} />
    return (
      <div>
        {loading && <p>...Loading</p>}
        <SortSelect onChange={this.handleSortChange} sortValue={SORT_CHART[sort_by]} />
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
      || prevProps.author !== this.props.author
      || prevState.sort_by !== this.state.sort_by
      || prevState.order !== this.state.order
    ) {
      this.fetchArticles();
    }
  }
  fetchArticles = () => {
    this.setState({
      ...this.state,
      loading: true
    });
    getArticles(this.props.topic, this.props.author, this.state.sort_by, this.state.order)
      .then(({ articles }) => {
        this.setState(prev => ({
          ...prev,
          loading: false,
          articles
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

export default ArticleList;