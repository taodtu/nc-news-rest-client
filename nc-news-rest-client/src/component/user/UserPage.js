import React, { Component } from 'react';
import UserItem from './UserItem';
import { getUser, getCommentsByUser } from '../api';
import ToggleButton from '../button/ToggleButton'
import ErrorMsg from '../error/Error';
import ArticleList from '../article/ArticleList';
import CommentList from '../comment/CommentList';
import { UserContext } from '../UserContext';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: false,
  ShowList: "Articles",
}
class UserPage extends Component {
  state = {
    ...INITIAL_STATE
  }
  handleListToggle = (listName) => {
    this.setState({
      ShowList: listName
    })
  }
  render() {
    const { user, loading, error, ShowList } = this.state;
    if (error) return <ErrorMsg error={error} />
    return (
      <div>
        <hr />
        {loading && <p>...loading</p>}
        {user && <UserItem user={user} />}
        {user && <ToggleButton left={"Articles"} right={"Comments"} onClick={this.handleListToggle} />}
        {user && (ShowList === "Articles" ? <ArticleList author={user.username} />
          : <UserContext.Consumer>
            {value => <CommentList id={user.username} currentUser={value} getComments={getCommentsByUser} />}
          </UserContext.Consumer>
        )}
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