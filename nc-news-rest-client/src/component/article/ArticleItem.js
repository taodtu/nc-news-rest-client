import React from 'react';
import Style from './ArticleItem.module.css';
import { Button } from '@material-ui/core';
import { Link } from '@reach/router';

const ArticleItem = ({ article: { article_id, title, comment_count, topic, votes, created_at, author } }) => {
  return (
    <div className={Style.item}>
      <div className={Style.article}>
        <Link to={`/articles/${article_id}`} ><Button size="small" color="primary"> <h3>Title: {title} </h3></Button></Link>
      </div>
      <div className={Style.article}>
        <span className={Style.tag}>article_id: {article_id} </span>
        <span className={Style.tag}><Link to={`/topics/${topic}`} ><Button size="small" color="primary">topic: {topic} </Button></Link></span>
        <span className={Style.tag}><Link to={`/users/${author}`} ><Button size="small" color="primary">author:  {author}</Button></Link></span>
      </div>
      <div className={Style.article}>
        <span className={Style.tag}>Votes: {votes} </span>
        <span className={Style.tag}>Comments: {comment_count} </span>
        <span className={Style.tag}>Date:  {created_at}</span></div>
    </div>
  )

}

export default ArticleItem;