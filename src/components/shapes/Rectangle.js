
import uuid from 'uuid/v4';

export default class Rectangle {

	constructor(props) {
		this.id = uuid();
		this.x = props.x || 0;
		this.y = props.y || 0;

		this.width = props.width || 0;
		this.height = props.height || 0;

		this.lineWidth = props.lineWidth || 5;
		this.strokeStyle = props.strokeStyle || '#FFDD00';
		this.fillStyle = props.fillStyle || '#00DDFF';
	}

	draw(context) {
		if (!context) {
			return;
		}

		//save the context state like stroke, fill, transform
		context.save();

		context.fillStyle = this.fillStyle;
		context.fillRect(this.x, this.y, this.width, this.height);

		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.strokeStyle;
		context.strokeRect(this.x, this.y, this.width, this.height);

		//restore context state
		context.restore();
	}
}