import React, { Component, PropTypes } from 'react';

import './Editor.css';
import  DrawCanvas from '../DrawCanvas/DrawCanvas';
import Toolbar from '../toolbar/Toolbar';

import { isNumeric } from '../../utils/util';

import { SelectionTool, RectangleTool } from '../../tools'

class Editor extends Component {

  shapeProperties = {};
  tools = {};

  constructor(props) {
    super(props);

    //bind functions
    this.handleToolChange = this.handleToolChange.bind(this);
    this.onInspectorChange = this.onInspectorChange.bind(this);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    //create all the tools
    const selectionTool = new SelectionTool();
    selectionTool.selected = true;

    const rectangleTool = new RectangleTool();

    this.tools[selectionTool.TOOL_NAME] = selectionTool;
    this.tools[rectangleTool.TOOL_NAME] = rectangleTool;

    this.editorHeight = this.props.editorHeight - 90;

    //set initial state
    this.state = {
      tools: this.tools,
      selectedTool: selectionTool
    }
  }
 
  /* delegate mouse events to the active tool */
  onMouseDown = (e) => {
    this.state.selectedTool.onMouseDown(e);
  };

  onMouseMove = (e) => {
    this.state.selectedTool.onMouseMove(e);
  };

  onMouseUp = (e) => {
    this.state.selectedTool.onMouseUp(e);
  };

  handleToolChange(event) {
    const tools = this.state.tools;
    const toolName = event.target.value;

    //reset selection
    Object.keys(tools).forEach(key => {
      const tool = tools[key];
      tool['selected'] = (tool.TOOL_NAME === toolName);
    });

    let activeTool = tools[toolName];

    this.setState({
      tools: tools,
      selectedTool: activeTool
    });
  }

  onInspectorChange(e) {
    const selectedTool = this.state.selectedTool;
    let value = isNumeric(e.target.value) ? parseInt(e.target.value, 10) : e.target.value;

    selectedTool.currentShapeProperties[e.target.name] = value;

    this.setState({
      selectedTool
    });

    //update the tool state
    this.currentShapeProperties = selectedTool.currentShapeProperties;
  }

  componentWillReceiveProps(nextProps) {
    //draw shapes on the drawCanvas
    nextProps.shapes.forEach(shape => {
      shape.draw(this.drawCanvas.context);
    });
  }

  componentDidMount() {

    //The canvas ref is valid now, give each tool their canvas to draw on
    Object.keys(this.state.tools).forEach(key => {
      const tool = this.state.tools[key];
      tool.setCanvas(this.selectionCanvas);
    });
  }
              
  render() {
    const { canvasSize } = this.props;

    let editorHeight = (this.props.editorHeight) ? this.props.editorHeight : 200;

    const canvasGroupStyle = {
      height: editorHeight - 90
    };

    return (
      <div className="editor">
        <Toolbar className="toolbar" 
                 onChange={this.handleToolChange} 
                 tools={this.state.tools}
                 selectedTool={this.state.selectedTool}
                 onInspectorChange={this.onInspectorChange}
                 shapeProperties={this.shapeProperties} />

        <div className="canvasGroup"
             style={canvasGroupStyle}
             onMouseDown={this.onMouseDown}
             onMouseMove={this.onMouseMove}
             onMouseUp={this.onMouseUp} >

            <DrawCanvas id="drawCanvas" 
                        ref={(canvas) => this.drawCanvas = canvas }
                        canvasSize={canvasSize} />
                      
            
            <DrawCanvas id="selectionCanvas" 
                        ref={(canvas) => this.selectionCanvas = canvas }
                        canvasSize={canvasSize} />
              
        </div>
      </div>
    );
  }
}

DrawCanvas.propTypes = {
  canvasSize: PropTypes.object.isRequired,
  editorHeight: PropTypes.number
};

export default Editor;