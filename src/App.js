import React, { Component } from 'react';

import './App.css';
import  Editor from './components/Editor/Editor';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header"></div>
   			<Editor />
      </div>
    );
  }
}

export default App;
