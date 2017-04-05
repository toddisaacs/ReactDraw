import React, { Component } from 'react';

import './App.css';
import  Editor from './components/Editor/Editor';
import { rectIntersect } from './utils/util';

class App extends Component {

  //Timer to delay resize events until we are "done" resizing
  waitForResize;
  tools = {};

	constructor(props) {
    super(props);

    //bind methods
    this.windowResize = this.windowResize.bind(this);
    this.changeTool = this.changeTool.bind(this);
    this.onAddShape = this.onAddShape.bind(this);
    this.onSelection = this.onSelection.bind(this);

    //set initial state
    this.state = {
      appHeight: window.screen.availHeight,
      canvasSize: {width: 1200, height:1200},
      //workaround for handling the drawing outside of react TODO look at react canvas
      shapes: [],
      selectedShapes: []
    };
  }

  resizeEditor() {
    this.setState({ appHeight: this.appRef.clientHeight });
  }

  changeTool(toolname) {

    this.setState({
      selectedToolName: toolname,
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

  onAddShape(e) {
    //keep track off all shapes to display
    this.setState({
      shapes: this.state.shapes.concat([e.detail])
    });
  }

  onSelection(e) {
    const mouseBox = e.detail;
    const selectedShapes = [];

    //TODO probably need to invert this loop if we worry about z-order
    this.state.shapes.forEach((shape) => {
      if (rectIntersect( shape, mouseBox)) {
       console.log(shape.id);
       selectedShapes.push(shape.id);
      }
    });

    this.setState({
      selectedShapes
    });
  }

  /*
    Could not figure out how to get the canvas to layout with just CSS on top of each other 
    without setting the size.  Using a window resize listener to update after a resize.
  */
	componentDidMount() {
    window.addEventListener('resize', this.windowResize);
    document.addEventListener('addShape', this.onAddShape, false);
    document.addEventListener('selectionEvent', this.onSelection, false);
		this.resizeEditor();
	}

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
    document.removeEventListener('addShape', this.onAddShape, false);
    document.removeEventListener('selectionEvent', this.onSelection, false);
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
                tools={this.state.tools}
        />
      </div>
    );
  }
}

export default App;
