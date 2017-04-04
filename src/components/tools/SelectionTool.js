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
  }
};

export { SelectionTool as default };


