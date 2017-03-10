import React, { Component, PropTypes } from 'react';

import './DrawCanvas.css';

class DrawCanvas extends Component {

constructor(props) {
    super(props);
  }

  getRef(ref) {
    this.canvasRef = ref;
  }

  componentDidMount() {
  	this.context = this.canvasRef.getContext('2d');
  }

  onMouseDown(e) {
    this.mouseDown = true;
    this.startPos = this.getCursorPosition(e);
    console.log('startPos ', this.startPos);
  }

  onMouseMove(e) {
    if (this.mouseDown) {
      this.clearCanvas();
      let currentPos = this.getCursorPosition(e);
      this.drawRectOutline(this.startPos, currentPos);  
      console.log('mouse down and moving');
    }
  }

  onMouseUp(e) {
    this.mouseDown = false;
  	this.endPos = this.getCursorPosition(e);
		console.log('endPos ', this.endPos);

    //workaround until we have a seperate drawing canvas
    this.clearCanvas();
  	this.drawRect(this.startPos, this.endPos);   
  }

  drawRectOutline(startPos, endPos) {
      let width = endPos.x - startPos.x;
      let height = endPos.y - startPos.y;

      this.context.setLineDash([6]);
      this.context.strokeRect(startPos.x, startPos.y, width, height);
      this.context.setLineDash([0]);
  }

  drawRect(startPos, endPos)  {
  		let width = endPos.x - startPos.x;
  		let height = endPos.y - startPos.y;
  		console.log('startPos, ', startPos);
  		console.log('endPos, ', endPos);
  		console.log('width ', width);
  		console.log('height ', height);

    
  	this.context.fillRect(startPos.x, startPos.y, width, height);
    //this.context .clearRect(45, 45, 60, 60);
    //this.context .strokeRect(50, 50, 50, 50);
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
  }

  getCursorPosition(e) {
  	let rect = this.canvasRef.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }


  render() {
    return (
       <canvas 	id="drawCanvas" 
       					ref={ (ref) => this.getRef(ref) } 
       					className"draw-canvas" 
       					style="pointer-event='none';"
       					onMouseDown={this.onMouseDown}
       					onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
       					width="1200"
       					height="1200"
       					>
       </canvas>
    );
  }
}

DrawCanvas.propTypes = {
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func
}

export default DrawCanvas;