import React, { Component } from 'react';

import './Editor.css';
import  DrawCanvas from '../DrawCanvas/DrawCanvas';

class Editor extends Component {

  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseDown() {
    console.log('onMouseDown');
  }

  render() {
    return (
      <div id="Div1" className="draw-canvas-holder" >
        <div className="canvasGroup">
          <DrawCanvas id="drawCamvas" />
        </div>
      </div>
    );
  }
}

export default Editor;