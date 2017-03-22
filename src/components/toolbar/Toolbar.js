import React, { Component, PropTypes } from 'react';

class Toolbar extends Component {

  constructor(props) {
    super(props);

    this.handleToolChange = this.handleToolChange.bind(this);
  }

  handleToolChange = (event) => {
    console.log('tool change ', event.target.value);
    this.props.onChange(event.target.value);
  }

  render() {
    const { toolname } = this.props || 'SelectionTool';

    return (
      <div id="toolbar" className="toolbar" >
        <input  type="radio" 
                name="tool" 
                value='SelectionTool'
                checked={toolname === 'SelectionTool'}
                onChange={this.handleToolChange} /> S

        <input  type="radio" 
                name="tool" 
                value='RectangleTool'
                checked={toolname === 'RectangleTool'}
                onChange={this.handleToolChange}  /> R
      </div>
    );
  }
}

Toolbar.propTypes = {
  toolname: PropTypes.string
}

export default Toolbar;