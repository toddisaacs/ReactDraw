import React, { PropTypes } from 'react';

import './ToolBar.css';
import Inspector from './Inspector';

const Toolbar = ({tools, selectedTool, onChange, onInspectorChange}) => (

      <div id="toolbar" className="toolbar" >
        <div className="tool-holder">
        
          {Object.keys(tools).map(key => {
            const tool = tools[key];

            return (
              <span key={tool.TOOL_NAME}>
                <span>{tool.TOOL_NAME}</span>
                <input  type="radio" 
                        name="tool" 
                        value={tool.TOOL_NAME}
                        checked={selectedTool.TOOL_NAME === tool.TOOL_NAME}
                        onChange={onChange} /></span>
            )
          })}

        </div>
        <Inspector shapeProperties={selectedTool.currentShapeProperties}
                   onInspectorChange={onInspectorChange}/>
      </div>

);

Toolbar.propTypes = {
  tools: PropTypes.object,
  selectedTool: PropTypes.object,
  onChange: PropTypes.func
};

export default Toolbar;