import React, { Component } from 'react';
import { getArticles } from '../api';

const INITIAL_STATE = {
 articles: null,
 error: '',
 loading: false
}

class ArticleList extends Component {
 state = {
  ...INITIAL_STATE
 }
 componentDidMount() {
  this.setState({
   ...this.state,
   loading: true
  });
  getArticles(this.props.topic)
   .then(articles => {
    this.setState({
     ...this.state,
     articles
    })
   })
 }

 render() {
  const { articles } = this.state
  return (
   <div>
    {articles.map(article => (
     <ArticleItem key={article.article_id} />
    ))}
   </div>
  );
 }
}

export default ArticleList;