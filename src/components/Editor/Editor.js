import React, { Component } from 'react';

import './Editor.css';
import  DrawCanvas from '../DrawCanvas/DrawCanvas';
import Toolbar from '../toolbar/Toolbar';

import { SelectionTool, RectangleTool } from '../tools'

class Editor extends Component {

constructor(props) {
    super(props);

    //bind funciton to this
    this.handleToolChange = this.handleToolChange.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);

    //this.tool =  new SelectionTool();
    console.log('Selection TOOL_NAME ', SelectionTool.TOOL_NAME);
    console.log('Rectangle TOOL_NAME ', RectangleTool.TOOL_NAME);

    this.state = {
      selectedTool: SelectionTool,
      components: []
    };

    console.log('Editor state ', this.state);
  }

  handleToolChange(toolname) {
    console.log('Editor notified of tool change ', toolname);
    //console.log('selection tool ', SelectionTool.TOOL_NAME);
    let tool = null;

    switch (toolname) {
      case SelectionTool.TOOL_NAME:
        tool = SelectionTool;
        break;
      case RectangleTool.TOOL_NAME:
        tool = RectangleTool;
        break;
 
      default:
        tool = SelectionTool;
    }


    this.setState({
      selectedTool: tool
    });
  }

  onMouseDown(e) {
    this.mouseDown = true;
    this.startPos = this.getCursorPosition(e);
    console.log('Editor startPos ', this.startPos);
  }

  render() {
    return (
      <div>
        <Toolbar onChange={this.handleToolChange} toolname={this.state.selectedTool.TOOL_NAME}/>
        <div id="Div1" className="draw-canvas-holder" >
          <div className="canvasGroup">
            <DrawCanvas id="displayCanvas" 
                        disabled={ true } 
                        tool={ null } />
            <DrawCanvas id="drawCanvas" 
                        disabled={ this.state.selectedTool.TOOL_NAME === SelectionTool.TOOL_NAME } 
                        tool={this.state.selectedTool} />

          </div>
        </div>
      </div>
    );
  }
}

export default Editor;