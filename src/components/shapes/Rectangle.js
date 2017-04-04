import Shape from './Shape';

export default class Rectangle extends Shape {

	static defaultShapeProperties = {
		fillColor: '#006600',
		strokeWidth: 5,
		strokeColor: '#000000',
		cornerRadius: 8
	};

	setProperties(shapeProps) {
		const {strokeWidth, strokeColor, fillColor, cornerRadius} = shapeProps;

		this.strokeWidth = strokeWidth;
		this.strokeColor = strokeColor;
		this.fillColor = fillColor;
		this.cornerRadius = cornerRadius;
	}

	//borrowed parts from: http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html
	roundedRect(ctx, x, y, width, height, fillColor, strokeWidth, strokeColor, radius) {

	  if (typeof radius === "undefined") {
	    radius = 0;
	  }
	  ctx.beginPath();
	  ctx.moveTo(x + radius, y);
	  ctx.lineTo(x + width - radius, y);
	  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	  ctx.lineTo(x + width, y + height - radius);
	  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	  ctx.lineTo(x + radius, y + height);
	  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	  ctx.lineTo(x, y + radius);
	  ctx.quadraticCurveTo(x, y, x + radius, y);
	  ctx.closePath();

	  if (strokeWidth >= 0) {
	  	ctx.lineWidth = this.strokeWidth;
	  	ctx.strokeStyle = strokeColor;
	    ctx.stroke();
	  }

	  if (fillColor ) {
	  	ctx.fillStyle = fillColor;
	    ctx.fill();
	  }
	}

	draw(ctx) {
		//save the ctx state like stroke, fill, transform
		ctx.save();

		this.roundedRect(ctx, this.x, this.y, this.width, this.height, this.fillColor, this.strokeWidth, this.strokeColor, this.cornerRadius);

		//restore context state
		ctx.restore();
	}
}