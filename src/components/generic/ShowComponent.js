import React, {Component, defaultProps} from 'react';

export default class Show extends Component {
	static defaultProps = {
		model: true
	};
	render() {
		return <div>{this.props.model ? this.props.children : null}</div>
	}
}