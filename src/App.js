import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Visualization, Toolbar } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Visualization />
      </div>
    );
  }
}

export default App;
