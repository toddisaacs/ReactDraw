import React, { Component } from 'react';

import './App.css';
import  Editor from './components/Editor/Editor';

class App extends Component {

  waitForResize;

	constructor(props) {
    super(props);

    //set initial state
    this.state = {
      appHeight: window.screen.availHeight,
      canvasSize: {width: 1200, height:1200}
    };
     console.log('App - appHeight on constructor ', window.screen.availHeight);
    //TODO - Can this be handled in CSS while preserving the canvas hierarchy?
    //listen for resize so we can set up editor properly 
    this.windowResize = this.windowResize.bind(this);
  }

  resizeEditor() {
    this.setState({ appHeight: this.appRef.clientHeight });
  }

  /*
    Handles resize "finish" by waiting for user to pause.
  */
  windowResize() {
    clearTimeout(this.waitForResize);

    this.waitForResize = setTimeout( () => {
      //we have a pause consider this resized
      this.resizeEditor();
    }, 250);
  }

  /*
    Could not figre out how to get the canvas to layout with CSS on top of each other 
    without setting the size.  Using a window resize listener to update after a resize.
  */
	componentDidMount() {
    window.addEventListener('resize', this.windowResize);
		this.resizeEditor();
	}

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  render() {
    return (
      <div ref={ (div) => { this.appRef = div; } }  
      		 className="App">
        <div className="App-header"></div>
   			<Editor editorHeight={this.state.appHeight} canvasSize={this.state.canvasSize}/>
      </div>
    );
  }
}

export default App;
