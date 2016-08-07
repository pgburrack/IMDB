import React, {Component, PropTypes} from 'react';
import ModelsTableHeaders from './ModelsTableHeadersComp';

export default class ProductionModelsTable extends Component {
	render() {
		return (
			<table className="table table-striped">
				<thead>
					<ModelsTableHeaders/>
				</thead>
				<tbody>
					<tr>
						<td>
							<select className="form-control">
								<option>Model 1</option>
								<option>Model 2</option>
								<option>Model 3</option>
								<option>Model 4</option>
								<option>Model 5</option>
							</select>
						</td>
						<td>
							Current
						</td>
						<td>
							<input className="form-control" type="text" value="80"/>
						</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
