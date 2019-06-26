import React, { Component } from 'react';
import UserItem from './UserItem';
import { getUser } from '../api';
import ToggleButton from '../button/ToggleButton'
import Error from '../error/Error';
import ArticleList from '../article/ArticleList';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: false,
}
class UserPage extends Component {
  state = {
    ...INITIAL_STATE
  }
  render() {
    const { user, loading, error } = this.state;
    if (error) return <Error error={error} />
    return (
      <div>
        <hr />
        {loading && <p>...loading</p>}
        {user && <UserItem user={user} />}
        {user && <ToggleButton left={"Articles"} right={"Comments"} />}
        {user && <ArticleList author={user.username} />}
      </div>
    );
  }
  componentDidMount() {
    this.fetchUser()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.author !== this.props.author) {
      this.fetchUser();
    }
  }
  fetchUser = () => {
    this.setState({
      ...this.state,
      loading: true
    });
    getUser(this.props.author)
      .then(user => {
        this.setState({
          ...INITIAL_STATE,
          user,
        })
      })
      .catch(error => {
        this.setState({
          ...INITIAL_STATE,
          error,
        })
      })
  }
}

export default UserPage;