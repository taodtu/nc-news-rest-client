import React, { Component } from 'react';
import { getArticle } from '../api';
import Article from './Article';
// import Comment from '../comment/Comment';
// import AddComment from '../comment/AddComment';
const INITIAL_STATE = {
 article: null,
 comments: null,
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
  return (
   <div>
    {loading && <p>...Loading</p>}
    {error && <p>error: {error}</p>}
    <h3>Article (id:{id}) and Comments </h3>
    <Article {...article} />
    <hr />
    {/* <AddComment id={id} />
    {comments.map(comment => <Comment {...comment} key={comment.comment_id} />)} */}
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