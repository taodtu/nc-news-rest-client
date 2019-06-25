import React from 'react';
import { Button } from '@material-ui/core';

const DeleteComment = ({ handleDelete }) => {
 return (
  <div className="deletebutton">
   <Button variant="contained" size="small" color="secondary"
    onClick={handleDelete}> Delete </Button></div>
 );
};

export default DeleteComment;