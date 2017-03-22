export  class SelectionTool {

	TOOL_NAME = 'SelectionTool';
  
	context = null;
	cursor = 'default';
	
	constructor() {
		this.canvasRef = null
	}

	setCanvas(canvasRef) {
    this.canvasRef = canvasRef;
  }

	onMouseDown = (e) => {
		console.log('Selection Tool - onMouseDown');
	}

	onMouseMove = (e) => {
		console.log('Selection Tool - onMouseMove');
	}

	onMouseUp = (e) => {
		console.log('Selection Tool - onMouseUp');
	}

};

export { SelectionTool as default };


