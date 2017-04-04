import React, { Component, PropTypes } from 'react';

import './ToolBar.css';
import Inspector from './Inspector';

class Toolbar extends Component {

  componentWillMount() {
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
};

export default Toolbar;