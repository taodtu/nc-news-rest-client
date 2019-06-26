import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleItem from './ArticleItem';
import Error from '../error/Error'
import { SortSelectWithCommentCount } from '../button/SortSelect';
import ToggleButton from '../button/ToggleButton';
import Page from './Page';
import LimitSelect from '../button/LimitSelect';

const INITIAL_STATE = {
  articles: null,
  error: '',
  loading: false,
  sort_by: 'created_at',
  order: 'desc',
  limit: 6,
  p: 1
}

const SORT_CHART = {
  "created_at": 'date',
  'date': "created_at",
  "id": "article_id",
  "article_id": "id",
  "votes": "votes",
  "author": "author",
  "comment_count": "comments",
  "comments": "comment_count"
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
  handleLimitChange = ({ target }) => {
    const { value } = target;
    this.setState(prev => ({
      ...prev,
      limit: value
    }))
  }
  handlePageClick = (pageNumber) => {
    this.setState(prev => ({
      ...prev,
      p: pageNumber
    }))
  }
  render() {
    const { articles, loading, error, sort_by, limit, p } = this.state
    if (error) return <Error error={error} />
    return (
      <div>
        {loading && <p>...Loading</p>}
        <div className="article-sort-order">
          <SortSelectWithCommentCount onChange={this.handleSortChange} sortValue={SORT_CHART[sort_by]} />
          <ToggleButton left={"desc"} right={"asc"} onClick={this.handleToggle} />
        </div>
        {articles && articles.articles.map(article => <ArticleItem key={article.article_id} article={article} />)}
        {articles && <Page pageTotal={Math.ceil(articles.total_count / limit)} onClick={this.handlePageClick} p={p} />}
        <LimitSelect onChange={this.handleLimitChange} limit={limit} />
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
      || prevState.limit !== this.state.limit
    ) {
      this.fetchArticles(1);
    }
    if (prevState.p !== this.state.p) {
      this.fetchArticles(this.state.p);
    }
  }
  fetchArticles = (page) => {
    const { sort_by, order, limit, p } = this.state
    this.setState({
      ...this.state,
      loading: true
    });
    getArticles(this.props.topic, this.props.author, sort_by, order, limit, p)
      .then(({ articles }) => {
        this.setState(prev => ({
          ...prev,
          loading: false,
          p: page,
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