export  class RectangleTool {

	static TOOL_NAME = 'RectangleTool';

	static onMouseDown = (e) => {
		console.log('Rectangle Tool - onMouseDown');
	}

	static onMouseMove = (e) => {
		console.log('Rectangle Tool - onMouseMove');
	}

	static onMouseUp = (e) => {
		console.log('Rectangle Tool - onMouseUp');
	}

};

export { RectangleTool as default };