import React from 'react';
import Style from './Article.module.css';

const Article = ({
 article_id,
 title,
 body,
 author,
 topic,
 votes,
 created_at,
 comment_count,
 children }) => {
 return (
  <div className={Style.article} >
   <div className={Style.left}>
    <span className={Style.tag}>Slug: {topic}</span>
    <span className={Style.tag}>Author: {author}</span>
    <span className={Style.tag}>Date: {created_at}</span>
    <span className={Style.tag}>Comments: {comment_count}</span>
   </div>
   <div className={Style.mid}>
    <p><strong>Title: {title}</strong></p>
    <p>Text: {body}</p>
   </div>
   <div className={Style.right}>
    <p className={Style.p}>Votes: {votes}</p>
    {children}
    {/* <VoteArticle id={article_id} votes={votes} /> */}
   </div>
  </div>
 );
};

export default Article;