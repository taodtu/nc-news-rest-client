import React, { Component } from 'react';
import { Button } from '@material-ui/core';
class Vote extends Component {
  render() {
    const { votes, id, handleVote } = this.props;
    return (
      <div>
        <Button variant="outlined" size="small" color="primary"
          onClick={handleVote}> + vote! </Button>
      </div>
    );
  }
}

export default Vote;

