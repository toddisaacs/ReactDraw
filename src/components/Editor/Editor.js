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
    // this.state = {
    //   selectedToolName: 'SelectionTool',
    //   components: []
    // };

    this.editorHeight = this.props.editorHeight - 90;
  }

  getTool(toolname) {
    return this.toolMap.get(toolname);
  }

  handleToolChange(toolname) {
    this.props.onToolChange(toolname);
    // this.setState({
    //   selectedToolName: toolname
    // });
  }

  /* delegate mouse events to the active tool */
  onMouseDown = (e) => {
    this.getTool(this.props.selectedToolName).onMouseDown(e);
  }

  onMouseMove = (e) => {
    this.getTool(this.props.selectedToolName).onMouseMove(e);
  }

  onMouseUp = (e) => {
    this.getTool(this.props.selectedToolName).onMouseUp(e);
  }

  componentWillReceiveProps(nextProps) {
    console.log('Editor props received ', nextProps);
    //this.editorHeight = nextProps.editorHeight - 90;

    //draw shapes
    nextProps.shapes.forEach(shape => {
      shape.draw(this.drawCanvas.context);
    });
  }

 

  componentDidMount() {
    //The canvas ref is valid now
    this.getTool('RectangleTool').setCanvas(this.selectionCanvas);
    this.getTool('SelectionTool').setCanvas(this.selectionCanvas);
  }
              
  render() {
    const { canvasSize, editorHeight } = this.props;

    const canvasGroupStyle = {
      height: editorHeight - 90, 
      cursor:this.getTool(this.props.selectedToolName).cursor | 'crosshair'
    };

    console.log('canvasGroup Style', canvasGroupStyle);
    return (
      <div className="editor">
        <Toolbar className="toolbar" onChange={this.handleToolChange} toolname={this.props.selectedToolName} />

        <div className="canvasGroup" 
             ref={(div) => this.canvasGroup = div}
             style={canvasGroupStyle}
             onMouseDown={this.onMouseDown}
             onMouseMove={this.onMouseMove}
             onMouseUp={this.onMouseUp}
        >

            <DrawCanvas id="drawCanvas" 
                        ref={(canvas) => this.drawCanvas = canvas }
                        canvasSize={canvasSize}
                    
                         />
                      
            
            <DrawCanvas id="selectionCanvas" 
                        ref={(canvas) => this.selectionCanvas = canvas }
                        canvasSize={canvasSize}
            
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