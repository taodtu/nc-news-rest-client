import React from 'react';
import { Button } from '@material-ui/core';

const VoteUp = ({ handleClick }) => {
 return (
  <Button variant="outlined" size="small" color="secondary"
   onClick={handleClick}> - vote! </Button>
 );
};

export default VoteUp;