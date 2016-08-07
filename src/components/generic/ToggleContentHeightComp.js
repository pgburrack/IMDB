import React, {Component, PropTypes, defaultProps} from 'react';

/**
 * ToggleContentHeight - enables to toggle content with animation
 */
export default class ToggleContentHeight extends Component {
	static propTypes = {
		show: React.PropTypes.bool,
		transitionSpeed: React.PropTypes.string,
		className: React.PropTypes.string
	};
	static defaultProps = {
		transitionSpeed: "0.5s"
	}
	constructor(props) {
		super(props);
	}
	render() {
		const {className} = this.props;
		let height = this.props.show ? '3000px' : '0';
		let transitionName = this.props.show ? "ease-in" : "ease-out";

		return (
			<div
				className={className}
				style={{
						overflow: 'hidden',
						maxHeight: height,
						transition: 'max-height ' + this.props.transitionSpeed + ' ' + transitionName
				}}>
				{this.props.children}
			</div>
		)
	}
}