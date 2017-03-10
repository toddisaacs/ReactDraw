export  class SelectionTool {

	static TOOL_NAME = 'SelectionTool';

	static onMouseDown = (e) => {
		console.log('Selection Tool - onMouseDown');
	}

	static onMouseMove = (e) => {
		console.log('Selection Tool - onMouseMove');
	}

	static onMouseUp = (e) => {
		console.log('Selection Tool - onMouseUp');
	}

};

export { SelectionTool as default };


