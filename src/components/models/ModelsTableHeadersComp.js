import React, {Component, PropTypes} from 'react';

export default class ModelsTableHeaders extends Component {
	render() {
		return (
			<tr>
				<td>Model Name</td>
				<td>Model Type</td>
				<td>Traffic (%)</td>
			</tr>
		)
	}
}