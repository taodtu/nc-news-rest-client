import React, { Component } from 'react';
import Navigation from './component/Navigation';
import UserSelect from './component/button/UserSelect';
import Header from './component/Header';
import Footer from './component/Footer'
import { Link, Router } from '@reach/router';
import ArticleList from './component/article/ArticleList';
import ArticlePage from './component/article/ArticlePage';
import ErrorMsg from './component/error/Error';
import UserPage from './component/user/UserPage';
import './App.css';

class App extends Component {
  state = {
    currentUser: "jessjelly"
  }
  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      currentUser: value
    })
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Header />
        <label>Current Author:</label>
        <UserSelect currentUser={currentUser} handleChange={this.handleChange} />
        <Link to={`/users/${currentUser}`} className="title-link">User</Link>
        <div className="nav" ><Navigation /></div>
        <div className="body">
          <Router>
            <ArticleList path="/topics/:topic" />
            {/* <ArticleList path="/users/:author" /> */}
            <UserPage path="/users/:author" currentUser={currentUser} />
            <ArticleList path="/" />
            <ArticlePage path="/articles/:id" currentUser={currentUser} />
            <ErrorMsg default />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
