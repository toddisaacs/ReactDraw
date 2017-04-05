
import uuid from 'uuid/v4';

export default class Shape {

	static defaultShapeProperties = {};

	constructor(props) {
		this.id = uuid();

		if (props) {
			this.x = props.x || 0;
			this.y = props.y || 0;

			this.width = props.width || 0;
			this.height = props.height || 0;
		}
	}

	setProperties(shapeProps) {
		console.log('Shape default setProperties()');
	}

	draw(context) {
		console.log('Shape default draw()');
	}
}