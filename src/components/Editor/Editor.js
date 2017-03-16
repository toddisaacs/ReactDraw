import React, { Component } from 'react';

import './Editor.css';
import  DrawCanvas from '../DrawCanvas/DrawCanvas';
import Toolbar from '../toolbar/Toolbar';

import { SelectionTool, RectangleTool } from '../tools'

class Editor extends Component {

  toolMap = new Map();

  constructor(props) {
    super(props);

    //bind funciton to this
    this.handleToolChange = this.handleToolChange.bind(this);
    this.handleDrawCanvasFocusChange = this.handleDrawCanvasFocusChange.bind(this);
    this.handleSelectionCanvasFocusChange = this.handleSelectionCanvasFocusChange.bind(this);

    this.onMouseDown = this.onMouseDown.bind(this);

    //this.tool =  new SelectionTool();
    console.log('Selection TOOL_NAME ', SelectionTool.TOOL_NAME);
    console.log('Rectangle TOOL_NAME ', RectangleTool.TOOL_NAME);

    this.toolMap.set('SelectionTool', new SelectionTool());
    this.toolMap.set('RectangleTool', new RectangleTool());

    this.state = {
      selectedTool: this.toolMap.get('SelectionTool'),
      components: []
    };

    console.log('Editor state ', this.state);
  }

  handleToolChange(toolname) {
    console.log('Editor notified of tool change ', toolname);
    //console.log('selection tool ', SelectionTool.TOOL_NAME);
    let tool = this.toolMap.get(toolname);

    //When we are in DrawingMode like Pen, Rect, etc use Drawcanvas
    //Activate selection canvas when in selection mode


    // switch (toolname) {
    //   case SelectionTool.TOOL_NAME:
    //     tool = toolname.;
    //     break;
    //   case RectangleTool.TOOL_NAME:
    //     tool = RectangleTool;
    //     break;
 
    //   default:
    //     tool = SelectionTool;
    // }

    //update state so everyone interested can respond
    this.setState({
      selectedTool: tool
    });


  }

  onMouseDown(e) {
    this.mouseDown = true;
    this.startPos = this.getCursorPosition(e);
    console.log('Editor startPos ', this.startPos);
  }

  handleDrawCanvasFocusChange(canvasRef) {
    this.drawCanvasRef = canvasRef;
    this.toolMap.get('RectangleTool').setCanvas(canvasRef);

  }

  handleSelectionCanvasFocusChange(canvasRef) {
    this.selectionCanvasRef = canvasRef;
    this.toolMap.get('SelectionTool').setCanvas(canvasRef);
  }

 // componentDidMount() {
 //    //TODO grab from state
 //    //update tools with context 


    
 //  }
// <DrawCanvas id="displayCanvas" 
//                         disabled={ true } 
//                         tool={ null } />
                        
  render() {
    return (
      <div>
        <Toolbar onChange={this.handleToolChange} tool={this.state.selectedTool}/>
        <div id="Div1" className="draw-canvas-holder" >
          <div className="canvasGroup">
            
           <DrawCanvas id="drawCanvas" 
                        disabled={ this.state.selectedTool.TOOL_NAME === SelectionTool.TOOL_NAME } 
                        tool={this.state.selectedTool} 
                        onFocusChange={this.handleDrawCanvasFocusChange}/>
                      
            { /*
            <DrawCanvas id="selectionCanvas" 
                        disabled={ this.state.selectedTool.TOOL_NAME !== SelectionTool.TOOL_NAME } 
                        tool={this.state.selectedTool} 
                        onFocusChange={this.handleSelectionCanvasFocusChange}/>
            */}
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;