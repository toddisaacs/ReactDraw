import React, { Component, PropTypes } from 'react';

import './DrawCanvas.css';

class DrawCanvas extends Component {


  constructor(props) {
    super(props);

    this.tool = props.tool;
  }


  getRef = (canvas) => {
    this.canvasRef = canvas;
  }

  clearCanvas = () => {
    this.context.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
  }

  componentDidMount() {
  	this.context = this.canvasRef.getContext('2d');
  }


  render() {
    const { canvasSize } = this.props;

    return (
       <canvas 	
       					ref={ (ref) => { this.canvasRef = ref; } } 
       					className="draw-canvas" 
       					width={canvasSize.width}
       					height={canvasSize.height}
                >
       </canvas>
    );
  }
}


DrawCanvas.propTypes = {
  canvasSize: PropTypes.object.isRequired,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func
};

export default DrawCanvas;