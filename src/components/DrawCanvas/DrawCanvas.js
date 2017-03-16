import React, { Component, PropTypes } from 'react';

import './DrawCanvas.css';

class DrawCanvas extends Component {


  constructor(props) {
    console.log('DrawCanvas props CONSTRUCTOR ', props);
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.getRef = this.getRef.bind(this);

    this.clearCanvas = this.clearCanvas.bind(this);

    this.handleFocusChange = this.handleFocusChange.bind(this);

    this.startPos = null;
    this.endPos = null;

    this.mouseDown = false;
    this.tool = props.tool;

    this.activeCanvas = null;
  }

  componentWillReceiveProps(nextProps) {
    console.log('DrawCanvas props received ', nextProps);
    this.tool = nextProps.tool;
  }

  // initTool(tool) {
  //   this.tool = tool;
  //   tool.context = this.context;


  // }

  getRef(canvas) {
    this.canvasRef = canvas;
  }

  componentDidMount() {
  	this.context = this.canvasRef.getContext('2d');

    console.log('componentDidMount ' + this.props.disabled);

    //if (!this.props.disabled) {
      console.log('setting focus');
      //this.canvasRef.focus();
      this.canvasRef.focus();
    //} 

    this.active = !this.props.disabled;
  }

  onMouseDown(e) {
    if (this.active) {
      this.tool.onMouseDown(e);
    }
    
    // this.mouseDown = true;
    // this.startPos = this.getCursorPosition(e);
    // console.log('startPos ', this.startPos);
  }

  onMouseMove(e) {
    if (this.active) {
      this.tool.onMouseMove(e);
    }
    // if (this.mouseDown) {
    //   this.clearCanvas();
    //   let currentPos = this.getCursorPosition(e);
    //   this.drawRectOutline(this.startPos, currentPos);  
    //   //console.log('mouse down and moving');
    // }
  }

  onMouseUp(e) {
    if (this.active) {
      this.tool.onMouseUp(e);
    }
  //   this.mouseDown = false;
  // 	this.endPos = this.getCursorPosition(e);
		// //console.log('endPos ', this.endPos);

  //   //workaround until we have a seperate drawing canvas
  //   this.clearCanvas();
  // 	this.drawRect(this.startPos, this.endPos);   
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

  	this.context.fillRect(startPos.x, startPos.y, width, height);
    //this.context .clearRect(45, 45, 60, 60);
    //this.context .strokeRect(50, 50, 50, 50);
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
  }

  // getCursorPosition(e) {
  // 	let rect = this.canvasRef.getBoundingClientRect();
  //   return {
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top
  //   };
  // }

 

  //TODO can handle in redux by setting state with active editor
  //only thing i'm using this for is to get a ref to the context
  handleFocusChange(e) {
    console.log('handleFocusChange DrawCanvas');
    this.props.onFocusChange(this.canvasRef);
  }

  render() {
    return (
       <canvas 	
       					ref={ (ref) => { this.canvasRef = ref; } } 
       					className="draw-canvas" 
       					onMouseDown={this.onMouseDown}
       					onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
                onFocus={this.handleFocusChange}
                
       					width="1200"
       					height="1200" 
                >
       </canvas>
    );
  }
}
//tabIndex="0"

DrawCanvas.propTypes = {
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func
}

export default DrawCanvas;