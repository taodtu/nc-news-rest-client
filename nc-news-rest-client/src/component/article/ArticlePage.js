import React, { Component } from 'react';
import { getArticle } from '../api';
import Article from './Article';
import Comment from '../comment/Comment';
import AddComment from '../comment/AddComment';

class ArticlePage extends Component {
 render() {
  const { id } = this.props;
  return (
   <div>
    <Query query={GET_ARTICLE} variables={{ id }} >
     {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      const { getArticle: { comments, ...rest } } = data;
      return (
       <div>
        <h3>Article (id:{id}) and Comments </h3>
        <Article {...rest} />
        <hr />
        <AddComment id={id} />
        {comments.map(comment => <Comment {...comment} key={comment.comment_id} />)}
       </div>
      );
     }}
    </Query>
    <hr />
   </div>
  );
 }
}

export default ArticlePage;