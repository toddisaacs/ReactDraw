export  class RectangleTool {

	TOOL_NAME = 'RectangleTool';
  cursor = 'crosshair';
  
  constructor() {
    this.drawCanvas = null
    this.context = null;

    this.startPos = null;
    this.endPos = null;

    this.mouseDown = false;
  }

  setCanvas(drawCanvas) {
    this.drawCanvas = drawCanvas;
  }

  getCursorPosition(e) {
    let rect = this.drawCanvas.canvasRef.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  drawRectOutline(startPos, endPos) {
      let width = endPos.x - startPos.x;
      let height = endPos.y - startPos.y;

      this.drawCanvas.context.setLineDash([6]);
      this.drawCanvas.context.strokeRect(startPos.x, startPos.y, width, height);
      this.drawCanvas.context.setLineDash([0]);
  }

  drawRect(startPos, endPos)  {
    let width = endPos.x - startPos.x;
    let height = endPos.y - startPos.y;

    this.drawCanvas.context.fillRect(startPos.x, startPos.y, width, height);
  }

  clearCanvas() {
    this.drawCanvas.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
  }


	onMouseDown(e) {
   
    this.mouseDown = true;
    this.startPos = this.getCursorPosition(e);
    console.log('startPos ', this.startPos);
  }

  onMouseMove(e) {

    if (this.mouseDown) {
      this.drawCanvas.clearCanvas();
      let currentPos = this.getCursorPosition(e);
      this.drawRectOutline(this.startPos, currentPos);  
    }
  }

  onMouseUp(e) {
    this.mouseDown = false;
  	this.endPos = this.getCursorPosition(e);

    //workaround until we have a seperate drawing canvas
    this.drawCanvas.clearCanvas();
  	this.drawRect(this.startPos, this.endPos);   
  }

};

export { RectangleTool as default };