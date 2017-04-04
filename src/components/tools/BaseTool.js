export default class BaseTool {

  cursor = 'crosshair';

  currentShapeProperties = {};

  constructor() {
    this.drawCanvas = null;
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

  drawToolOutline(startPos, endPos) {
    const g = this.drawCanvas.context;
    
    let width = endPos.x - startPos.x;
    let height = endPos.y - startPos.y;

    g.setLineDash([6]);
    g.strokeRect(startPos.x, startPos.y, width, height);
    g.setLineDash([0]);
  }

  clearCanvas() {
    this.drawCanvas.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
  }


	onMouseDown(e) {
    this.mouseDown = true;
    this.startPos = this.getCursorPosition(e);
  }

  onMouseMove(e) {
    if (this.mouseDown) {
      this.drawCanvas.clearCanvas();
      let currentPos = this.getCursorPosition(e);
      this.drawToolOutline(this.startPos, currentPos);  
    }
  }

};