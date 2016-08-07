import React, {Component, PropTypes} from 'react';
import css from 'styles/generic/CssTooltip.scss';

/**
 * CssTooltip - Enables CSS "Tooltip"
 */
export default class CssTooltip extends Component {
	static propTypes = {
		children: React.PropTypes.object,
		tooltip: React.PropTypes.string,
    className: React.PropTypes.string
	};

	render() {
		return (
			<div className={`${this.props.className || ''} ${css.tooltips}`}>
				{this.props.children}
				<span>{this.props.tooltip}</span>
			</div>
		);
	}
}
