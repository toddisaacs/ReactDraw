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
                checked={this.props.toolname === 'SelectionTool'}

                onChange={this.handleToolChange} /> S

        <input  type="radio" 
                name="tool" 
                value='RectangleTool'
                checked={this.props.toolname === 'RectangleTool'}
                onChange={this.handleToolChange}  /> R
      </div>
    );
  }
}

Toolbar.propTypes = {
  tool: PropTypes.string
}

export default Toolbar;