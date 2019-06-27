import React from 'react';
import Style from './Comment.module.css';
import Vote from '../button/Vote';
import { updateComment } from '../api';

const Comment = ({ comment_id,
  author,
  body,
  votes,
  created_at,
  children }) => {
  return (
    <div className={Style.article} >
      <div className={Style.left}>
        <span className={Style.tag}>Comment_id: {comment_id}</span>
        <span className={Style.tag}>Author: {author}</span>
        <span className={Style.tag}>Date: {created_at.split("T")[0]}</span>
      </div>
      <div className={Style.mid}>
        <p>Comment: {body}</p>
      </div>
      <div className={Style.right}>
        <div className="vote"><Vote votes={votes} id={comment_id} handleVote={updateComment} /></div>
        <div className="vote">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Comment;