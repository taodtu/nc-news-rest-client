import React from 'react';
import { Button } from '@material-ui/core';

const DeleteComment = ({ handleDelete, comment_id, author }) => {
   return (
      <div className="deletebutton">
         <Button variant="contained" size="small" color="secondary"
            onClick={() => handleDelete(comment_id, author)}> Delete </Button></div>
   );
};

export default DeleteComment;