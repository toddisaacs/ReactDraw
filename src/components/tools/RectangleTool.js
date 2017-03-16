export  class RectangleTool {

	TOOL_NAME = 'RectangleTool';

	context = null;

  constructor() {
    this.canvasRef = null
    this.context = null;

    this.startPos = null;
    this.endPos = null;

    this.mouseDown = false;
  }

  setCanvas(canvasRef) {
    this.canvasRef = canvasRef;
    this.context = this.canvasRef.getContext('2d');
  }

  getCursorPosition(e) {
    let rect = this.canvasRef.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
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
      //console.log('mouse down and moving');
    }
  }

  onMouseUp(e) {
  
    this.mouseDown = false;
  	this.endPos = this.getCursorPosition(e);
		//console.log('endPos ', this.endPos);

    //workaround until we have a seperate drawing canvas
    this.clearCanvas();
  	this.drawRect(this.startPos, this.endPos);   
  }

};

export { RectangleTool as default };