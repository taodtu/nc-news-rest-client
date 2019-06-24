import React, { Component } from 'react';
import Navigation from './component/Navigation'
import Header from './component/Header';
import { Router } from '@reach/router';
import ArticleList from './component/article/ArticleList';

import './App.css';

class App extends Component {
  state = {
    currentUser: "jessjelly"
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Navigation />
        <Router>
          <ArticleList path="/topics/:topic" />
          <ArticleList path="/" />
        </Router>

      </div>
    );
  }
}

export default App;
