import BaseTool from './BaseTool';

export  class SelectionTool extends BaseTool {

	TOOL_NAME = 'SelectionTool';
  
	context = null;
	cursor = 'default';
	currentShapeProperties = {};
	selected = false;

 constructor() {
    super();

    //default the shape props 
    this.currentShapeProperties = {...SelectionTool.defaultShapeProperties};
  }


	setCanvas(drawCanvas) {
    this.drawCanvas = drawCanvas;
  }

	clearCanvas() {
    this.drawCanvas.context.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
  }

  onMouseUp(e) {
    this.mouseDown = false;

  	this.endPos = this.getCursorPosition(e);

    //workaround until we have a separate drawing canvas
    this.drawCanvas.clearCanvas();
  	
  	//select everything bound by the selection box or under pointer
    this.endPos = this.getCursorPosition(e);

    const width = Math.abs(this.endPos.x - this.startPos.x);
    const height = Math.abs(this.endPos.y - this.startPos.y);

    //flip the rectangle if drawn backwards
    const startX = (this.endPos.x - this.startPos.x < 0) ? this.startPos.x - width : this.startPos.x;
    const startY = (this.endPos.y - this.startPos.y < 0) ? this.startPos.y - height : this.startPos.y;

    const selectionBox = {
      x: startX,
      y: startY,
      width: width,
      height: height
    };

    const event = new CustomEvent('selectionEvent', { detail: selectionBox });
    document.dispatchEvent(event);
  }
}

export { SelectionTool as default };


