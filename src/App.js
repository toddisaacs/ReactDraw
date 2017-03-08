import React, { Component } from 'react';

import './App.css';
import  Editor from './components/Editor/Editor';

class App extends Component {

	// constructor(props) {
 //        super(props);

 //        this.state = {
 //            notes: [],
 //            bio: {},
 //            repos: []
 //      }
 //   }

	// init() {
	// 	console.log('testing');
	// }

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
