import React, { Component, PropTypes } from 'react';

import './ToolBar.css';
import Inspector from './Inspector';

class Toolbar extends Component {

  selectTool = null;

  //TODO - this is used in two places look for better way to handle the "active tool"
  getTool(tools) {
    let selectedTool = null;

    Object.keys(tools).forEach(key => {
      const tool = tools[key];
      if (tool.selected ) {
        selectedTool = tool;
      }
    });

    return (selectedTool) ? selectedTool : this.props.tools['SelectionTool'];
  }

  componentWillMount() {
    //this.selectedTool = this.getTool(this.props.tools);
    this.shapeProperties = this.props.selectedTool.currentShapeProperties;
  }

  componentWillReceiveProps(nextProps) {
    this.shapeProperties = {...nextProps.selectedTool.currentShapeProperties};
  }

  render() {

    return (
      <div id="toolbar" className="toolbar" >
        <div className="tool-holder">
        
          {Object.keys(this.props.tools).map(key => {
            const tool = this.props.tools[key];

            return (
              <span key={tool.TOOL_NAME}>
                <span>{tool.TOOL_NAME}</span>
                <input  type="radio" 
                        name="tool" 
                        value={tool.TOOL_NAME}
                        checked={this.props.selectedTool.TOOL_NAME === tool.TOOL_NAME}
                        onChange={this.props.onChange} /></span>
            )
          })}

        </div>
        <Inspector shapeProperties={this.shapeProperties} 
                   onInspectorChange={this.props.onInspectorChange}/>
      </div>
    );
  }
}

Toolbar.propTypes = {
  tools: PropTypes.object,
  selectedTool: PropTypes.object,
  onChange: PropTypes.func
}

export default Toolbar;