import React, {Component, PropTypes, defaultProps} from 'react';

/**
 * AlarmPlusSvg - generic svg component. looks like alarm clock with a plus sign inside
 */
export default class AlarmPlusSvg extends Component {
	static PropTypes = {
		width: React.PropTypes.string,
        height: React.PropTypes.string,
        color: React.PropTypes.string
	};
	static defaultProps = {
		color: '#000000',
		height: '48',
		width: '48'
	};
	constructor(props) {
		super(props);
	}
	render() {
		return (
				<svg onClick={this.props.onClick} onMouseOver={this.props.onMouseOver} className={this.props.className} fill={this.props.color} height={this.props.height} viewBox="0 0 24 24" width={this.props.width} xmlns="http://www.w3.org/2000/svg">
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"/>
				</svg>
			   )
	}
}