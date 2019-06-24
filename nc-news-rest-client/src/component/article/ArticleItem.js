import React from 'react';
import Style from './ArticleItem.module.css';
import { Button } from '@material-ui/core';
import { Link } from '@reach/router';

const ArticleItem = ({ article: { article_id, title, votes, created_at, comment_count } }) => {
 return (
  <div className={Style.item}>
   <div className={Style.article}>
    <Link to={`/articles/${article_id}`} ><Button size="small" color="primary"> <h3>Title: {title} </h3></Button></Link>
   </div>
   <div className={Style.article}>
    <span className={Style.tag}>article_id: {article_id} </span>
    <span className={Style.tag}>votes: {votes} </span>
    <span className={Style.tag}>comment_count:  {comment_count}</span>
   </div>
   <div className={Style.article}>Date created:  {created_at}</div>
  </div>
 )

}

export default ArticleItem;