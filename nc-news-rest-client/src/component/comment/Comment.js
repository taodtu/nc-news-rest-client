import React from 'react';
import Style from './Comment.module.css';
import VoteComment from './VoteComment';
import DeleteComment from './DeleteComment';

const Comment = ({ comment_id,
  article_id,
  author,
  body,
  votes,
  created_at }) => {
  return (
    <div className={Style.article} >
      <div className={Style.left}>
        <span className={Style.tag}>Comment_id: {comment_id}</span>
        <span className={Style.tag}>Author: {author}</span>
        <span className={Style.tag}>Date: {created_at}</span>
      </div>
      <div className={Style.mid}>
        <p>Comment: {body}</p>
      </div>
      <div className={Style.right}>
        <p>Votes: {votes}</p>
        <div className={Style.button}>
          <VoteComment article_id={article_id} comment_id={comment_id} /></div>
        <div className={Style.button}>
          <DeleteComment article_id={article_id} comment_id={comment_id} />
        </div>
      </div>
    </div>
  );
};

export default Comment;