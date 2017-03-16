import React, { Component, PropTypes } from 'react';

class Toolbar extends Component {

  constructor(props) {
    super(props);

    console.log('Toolbar props', props);
    this.handleToolChange = this.handleToolChange.bind(this);
  }

  handleToolChange = (event) => {
    console.log('tool change ', event.target.value);
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div id="toolbar" className="toolbar" >
        <input  type="radio" 
                name="tool" 
                value='SelectionTool'
                checked={this.props.tool.TOOL_NAME === 'SelectionTool'}
                onFocus={console.log('selection focus')}
                onChange={this.handleToolChange} /> S

        <input  type="radio" 
                name="tool" 
                value='RectangleTool'
                checked={this.props.tool.TOOL_NAME === 'RectangleTool'}
                onChange={this.handleToolChange}  /> R
      </div>
    );
  }
}

Toolbar.propTypes = {
  tool: PropTypes.object
}

export default Toolbar;