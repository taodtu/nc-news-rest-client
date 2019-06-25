import React, { Component } from 'react';
import { getArticle, updateArticle } from '../api';
import Article from './Article';
import CommentList from '../comment/CommentList'
import VoteUp from '../button/VoteUp';

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
 handleClick = () => {
  this.setState({
   ...this.state,
   loading: true
  });
  updateArticle(this.props.id, { inc_votes: 1 })
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
 render() {
  const { id } = this.props;
  const { loading, error, article } = this.state;
  return (
   <div>
    {loading && <p>...Loading</p>}
    {error && <p>error: {error}</p>}
    <h4>Article (id:{id}) and Comments </h4>
    <Article {...article}>
     <VoteUp handleClick={this.handleClick} />
    </Article>
    <hr />
    {/* <AddComment id={id} /> */}
    <CommentList id={id} />
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