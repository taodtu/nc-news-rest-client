import React from 'react';
import Navigation from './component/Navigation'
import Header from './component/Header';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />

      <Router>
        <AList path="/" />
        <Alist path="/topics/:topic" />
      </Router>

    </div>
  );
}

export default App;
