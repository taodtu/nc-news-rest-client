import React from 'react';
import Style from './ArticleItem.module.css';
import { Button } from '@material-ui/core';
import { Link } from '@reach/router';

const ArticleItem = ({ article: { article_id, title, votes, created_at, comment_count } }) => {
 console.log(article_id)
 return (

  <div className={Style.item}>
   <div className="article-item">
    <span className={Style.tag}>article_id: {article_id} </span>
    <span className={Style.tag}>votes: {votes} </span>
    <span className={Style.tag}>comment_count:  {comment_count}</span>
   </div>
   <div className="article-item">
    <Link to={`/articles/${article_id}`} ><Button variant="outlined" size="small" color="primary"> <strong>Title</strong>: {title} </Button></Link>

   </div>
   <span className={Style.tag}>Date created:  {created_at}</span>
  </div>
 )

}

export default ArticleItem;