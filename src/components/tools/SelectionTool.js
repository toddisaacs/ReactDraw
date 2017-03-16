export  class SelectionTool {

	 TOOL_NAME = 'SelectionTool';

	context = null;

	constructor() {
		this.canvasRef = null
    this.context = null;
	}

	setCanvas(canvasRef) {
    this.canvasRef = canvasRef;
    this.context = this.canvasRef.getContext('2d');
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


