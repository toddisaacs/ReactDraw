import Rectangle from '../shapes/Rectangle';
import BaseTool from './BaseTool';

export default class RectangleTool extends BaseTool {

	TOOL_NAME = 'RectangleTool';
  cursor = 'crosshair';

  currentShapeProperties = {};

  constructor() {
    super();

    //default the shape props 
    this.currentShapeProperties = {...Rectangle.defaultShapeProperties};
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
    const g = this.drawCanvas.context;
    
    let width = endPos.x - startPos.x;
    let height = endPos.y - startPos.y;

    g.setLineDash([6]);
    g.strokeRect(startPos.x, startPos.y, width, height);
    g.setLineDash([0]);
  }

  drawRect(startPos, endPos)  {
    let width = endPos.x - startPos.x;
    let height = endPos.y - startPos.y;

    const shape = new Rectangle({x: startPos.x, y: startPos.y, width: width, height: height});

    shape.fillColor = this.currentShapeProperties.fillColor;
    shape.strokeWidth = this.currentShapeProperties.strokeWidth;
    shape.setProperties(this.currentShapeProperties);


    //add shape to the displaylist 
    const event = new CustomEvent('addShape',  {'detail': shape} );
    document.dispatchEvent(event);
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

//export { RectangleTool as default };