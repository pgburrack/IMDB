import React, {Component, propTypes, defaultProps} from 'react';
import { valueLink } from 'decorators';

//@valueLink
export default class Select extends Component {
	static propTypes = {
		list: React.PropTypes.array,
		firstOptionValue: React.PropTypes.string,
		optionKey: React.PropTypes.string,
		optionValue: React.PropTypes.string,
		optionChild: React.PropTypes.string,
		optionKeyIsIndex: React.PropTypes.bool,
		className: React.PropTypes.string
	};
	static defaultProps = {
		list:[],
		optionKeyIsIndex: false
	};
	constructor(props) {
		super(props);
	}
	render() {
		const {
			firstOptionValue,
			list,
			optionKey,
			optionValue,
			optionChild,
			valueLink
		} = this.props;

		const options = list.map((option, index) => {
			let value = typeof option === 'string' ? option : option[optionValue];
			let child = typeof option === 'string' ? option : option[optionChild];
			let key = optionKeyIsIndex ? index : option[optionKey];

			return (<option key={key} value={value}>
						{child}
					</option>);
		});

		return (
			<select valueLink={valueLink}>
				{ firstOptionValue ? firstOptionValue : null }
				{ options }
			</select>
		)
	}
}