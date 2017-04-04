
import React, { Component, PropTypes } from 'react';
import './Inspector.css';

export default class Inspector extends Component {
	
	renderStrokeWidth(shapeProperties) {
		if (!shapeProperties.hasOwnProperty('strokeWidth')) {
			return null;
		}

		return(
			<span>
				Stroke Width: 
				<span>
						<select type="number"
										name="strokeWidth"
										value={shapeProperties.strokeWidth}
										onChange={this.props.onInspectorChange}>
							{	[...new Array(50)].map((x, i) =>
								<option key={i} value={i}>{i}</option>
							)}
						</select>
				</span>
			</span>
		);
	}


	renderStrokeColor(shapeProperties) {
		if (!shapeProperties.hasOwnProperty('strokeColor')) {
			return null;
		}

		return(
			<span>
				Stroke Color: 
				<span>
							<input type="color" 
						       size="2" 
						       className="inspector-tool" 
						       name="strokeColor" 
						       value={shapeProperties.strokeColor} 
						       onChange={this.props.onInspectorChange}
							/>
				</span>
			</span>
		);
	}

	renderFillColor(shapeProperties) {
		if (!shapeProperties.hasOwnProperty('fillColor')) {
			return null;
		}

		return(
			<span>
				Stroke Color: 
				<span>
							<input type="color" 
						       size="2" 
						       className="inspector-tool" 
						       name="fillColor" 
						       value={shapeProperties.fillColor} 
						       onChange={this.props.onInspectorChange}
							/>
				</span>
			</span>
		);
	}

	renderCornerRadius(shapeProperties) {
		if (!shapeProperties.hasOwnProperty('strokeWidth')) {
			return null;
		}

		return(
			<span>
				Corner Radius: 
				<span>
						<select type="number"
										name="cornerRadius"
										value={shapeProperties.cornerRadius}
										onChange={this.props.onInspectorChange}>
							{	[...Array(20)].map((x, i) => 
								<option key={i} value={i}>{i}</option>
							)}
						</select>
				</span>
			</span>
		)
	}

	render() {
		const shapeProperties = this.props.shapeProperties;

		return (
			<div className="inspector">
				{this.renderStrokeWidth(shapeProperties)}
				{this.renderStrokeColor(shapeProperties)}
				{this.renderFillColor(shapeProperties)}
				{this.renderCornerRadius(shapeProperties)}
			</div>
		)
	}
}

Inspector.propTypes = {
  shapeProperties: PropTypes.object,
  onInspectorChange: PropTypes.func
}