import React, { Component, PropTypes } from 'react';

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
    this.getTool = this.getTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.toolMap.set('SelectionTool', new SelectionTool());
    this.toolMap.set('RectangleTool', new RectangleTool());

    //set initial state
    this.state = {
      selectedToolName: 'SelectionTool',
      components: []
    };

    this.editorHeight = this.props.editorHeight - 90;
  }

  getTool(toolname) {
    return this.toolMap.get(toolname);
  }

  handleToolChange(toolname) {
    this.setState({
      selectedToolName: toolname
    });
  }

  /* delegate mouse events to the active tool */
  onMouseDown = (e) => {
    this.getTool(this.state.selectedToolName).onMouseDown(e);
  }

  onMouseMove = (e) => {
    this.getTool(this.state.selectedToolName).onMouseMove(e);
  }

  onMouseUp = (e) => {
    this.getTool(this.state.selectedToolName).onMouseUp(e);
  }

  componentWillReceiveProps(nextProps) {
    console.log('Editor props received ', nextProps);
    this.editorHeight = nextProps.editorHeight - 90;
  }

  componentDidMount() {
    //The canvas ref is valid now
    //console.log('componentDidMount', this.drawCanvas);
    this.getTool('RectangleTool').setCanvas(this.drawCanvas);
    this.getTool('SelectionTool').setCanvas(this.selectionCanvas);
  }
                   
  render() {
    const { canvasSize, editorHeight } = this.props;

    const canvasGroupStyle = {
      height: editorHeight, 
      cursor:this.getTool(this.state.selectedToolName).cursor | 'crosshair'
    };

    return (
      <div className="editor">
        <Toolbar className="toolbar" onChange={this.handleToolChange} toolname={this.state.selectedToolName} />

        <div className="canvasGroup" 
             style={canvasGroupStyle}
             onMouseDown={this.onMouseDown}
             onMouseMove={this.onMouseMove}
             onMouseUp={this.onMouseUp}>

            <DrawCanvas id="drawCanvas" 
                        ref={(canvas) => this.drawCanvas = canvas }
                        canvasSize={canvasSize}
                        style={{zIndex: 20, height: editorHeight}}
                         />
                      
            
            <DrawCanvas id="selectionCanvas" 
                        ref={(canvas) => this.selectionCanvas = canvas }
                        canvasSize={canvasSize}
                        style={{zIndex: 19, height: editorHeight}}
                         />
            
        </div>
      </div>
    );
  }
}

DrawCanvas.propTypes = {
  canvasSize: PropTypes.object.isRequired,
  editorHeight: PropTypes.number
}

export default Editor;