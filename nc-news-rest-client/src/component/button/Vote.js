import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import ErrorMsg from '../error/Error'

const INITIAL_STATE = {
  vote: 0,
  error: '',
  loading: false
}
class Vote extends Component {
  state = {
    ...INITIAL_STATE
  }
  voteUp = () => {
    this.updateVote(1)
  }
  voteDown = () => {
    this.updateVote(-1)
  }
  updateVote = (change) => {
    this.setState(prev => ({
      ...INITIAL_STATE,
      vote: prev.vote + change,
    }));
    this.props.handleVote(this.props.id, { inc_votes: change })
      .catch(error => {
        this.setState(prev => ({
          ...INITIAL_STATE,
          vote: prev.vote - change,
          error
        }))
      })
  }
  render() {
    const { votes } = this.props;
    const { vote, error, loading } = this.state;
    if (error) return <ErrorMsg error={error} />
    if (loading) return <p>...loading</p>
    return (
      <div className="vote-block">
        <p>Votes: {votes + vote}</p>
        <div className="vote">
          <Button variant="outlined" size="small" color="primary" disabled={vote > 0}
            onClick={this.voteUp}> + vote! </Button>
        </div>
        <div className="vote">
          <Button variant="outlined" size="small" color="secondary" disabled={vote < 0}
            onClick={this.voteDown}> - vote! </Button>
        </div>
      </div>
    )
  }
}

export default Vote;

