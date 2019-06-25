import React, { Component } from 'react';
import Navigation from './component/Navigation'
import Header from './component/Header';
import Footer from './component/Footer'
import { Link, Router } from '@reach/router';
import ArticleList from './component/article/ArticleList';
import ArticlePage from './component/article/ArticlePage';
import Error from './component/error/Error'
import { Select, MenuItem } from '@material-ui/core';
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
        <label>Current User:</label>
        <Select value={currentUser} autoWidth={true} onChange={this.handleChange}
        >
          <MenuItem value="jessjelly">jessjelly</MenuItem>
          <MenuItem value="tickle122">tickle122</MenuItem>
          <MenuItem value="grumpy19">grumpy19</MenuItem>
          <MenuItem value="happyamy2016">happyamy2016</MenuItem>
          <MenuItem value="cooljmessy">cooljmessy</MenuItem>
          <MenuItem value="weegembump">weegembump</MenuItem>
        </Select>
        <Link to={`/users/${currentUser}`} className="title-link">User</Link>
        <div className="nav" ><Navigation /></div>

        <Router>
          <ArticleList path="/topics/:topic" />
          <ArticleList path="/users/:author" />
          <ArticleList path="/" />
          <ArticlePage path="/articles/:id" />
          <Error default />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
