import React, { Component } from 'react';

import './App.css';
import  Editor from './components/Editor/Editor';

class App extends Component {

  waitForResize;

	constructor(props) {
    super(props);

    //bind methods
    this.changeTool = this.changeTool.bind(this);
    this.addShape = this.addShape.bind(this);

    //set initial state
    this.state = {
      appHeight: window.screen.availHeight,
      canvasSize: {width: 1200, height:1200},
      selectedToolName: 'SelectionTool',
      shapes: []
    };

     console.log('App - appHeight on constructor ', window.screen.availHeight);
    //TODO - Can this be handled in CSS while preserving the canvas hierarchy?
    //listen for resize so we can set up editor properly 
    this.windowResize = this.windowResize.bind(this);
  }

  resizeEditor() {
    this.setState({ appHeight: this.appRef.clientHeight });
  }

  changeTool(toolname) {
    this.setState({
      selectedToolName: toolname
    });
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

  addShape(e) {
    console.log('Shape Added', e.detail);

    this.setState({
      shapes: this.state.shapes.concat([e.detail])
    });
  }

  /*
    Could not figre out how to get the canvas to layout with CSS on top of each other 
    without setting the size.  Using a window resize listener to update after a resize.
  */
	componentDidMount() {
    window.addEventListener('resize', this.windowResize);
    document.addEventListener('addShape', this.addShape, false);
		this.resizeEditor();
	}

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
    document.removeEventListener('addShape', this.addShape, false);
  }

  render() {
    return (
      <div ref={ (div) => { this.appRef = div; } }  
      		 className="App">
        <div className="App-header"></div>
   			<Editor editorHeight={this.state.appHeight} 
                canvasSize={this.state.canvasSize}
                selectedToolName={this.state.selectedToolName}
                onToolChange={this.changeTool}
                shapes={this.state.shapes}
        />
      </div>
    );
  }
}

export default App;
