import React, {Component, PropTypes} from 'react';
import BootstrapBtn from './../genericComponents/BootstrapBtnComp';
import BootstrapPanel from './../genericComponents/BootstrapPanelComp';
import SwitchBtn from './../genericComponents/SwitchBtnComp';
import CampaignsList from './../components/models/CampaignsListComponent';
import ProductionModelsTable from './../components/models/ProductionModelsTableComponent';

import './../styles/ModelsView.scss';

const tempCampaignList = [
	{
		id: 0,
		name: "Campaign 1"
	},
	{
		id: 1,
		name: "Campaign 2"
	},
	{
		id: 2,
		name: "Campaign 3"
	},
	{
		id: 3,
		name: "Campaign 4"
	},
	{
		id: 4,
		name: "Campaign 5"
	}

];
export default class ModelsView extends Component {
	static propTypes = {

	}
	addNewABModel = (e) => {
		console.log('click on add new a/b model');
	}
	postNewUser = (e) => {

	}
	render() {
		// TODO: campaignsList is temporary
		const campaignsList = tempCampaignList;
		return (
			<div className="inner-view container">
				<h1>Models A/B testing</h1>

				<div className="row">
					<div className="col-sm-12">
						<CampaignsList
							campaignsList={campaignsList}/>
					</div>
				</div>

				<div className="push-top">
					<SwitchBtn
						onChange={()=>{}}
						switchKey={'models'}
						activeState={false}/>
				</div>
				<BootstrapPanel
					wrapperClassName="push-top"
					bodyClassName="table-responsive"
					showHeading={true}
					showBody={true}
					headingContent="Production"
					bodyContent=<ProductionModelsTable/>/>

				<div className="panel panel-default push-top">
  					<div className="panel-heading">A/B Testing</div>
					<div className="panel-body table-responsive">
						<table className="table table-striped">
							<thead>
								<tr>
									<td>Model Name</td>
									<td>Model Type</td>
									<td>Traffic (%)</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										Model 1
									</td>
									<td>
										Current
									</td>
									<td>
										<input className="form-control" type="text" value="20"/>
									</td>
								</tr>
								<tr>
									<td>
										Model 1
									</td>
									<td>
										Newest
									</td>
									<td>
										<input className="form-control" type="text" value="20"/>
									</td>
								</tr>
								<tr>
									<td>
										Model 2
									</td>
									<td>
										Newest
									</td>
									<td>
										<input className="form-control" type="text" value="20"/>
									</td>
								</tr>
								<tr>
									<td>
										Model 3
									</td>
									<td>
										Newest
									</td>
									<td>
										<input className="form-control" type="text" value="20"/>
									</td>
								</tr>
								<tr>
									<td>
										Model 4
									</td>
									<td>
										Newest
									</td>
									<td>
										<input className="form-control" type="text" value="20"/>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<BootstrapBtn
					onClick={this.addNewABModel}>
					Add
				</BootstrapBtn>

				<div className="panel panel-default">
					<h2 className="panel-heading">
						Add New Model
						 <button type="button" className="close"
						 	data-dismiss="modal" aria-label="Close">
						 	<span aria-hidden="true">&times;</span>
						 </button>
					</h2>

					<div className="panel-body">
						<div className="form-group row push-top">
						    <label className="col-sm-2">
								Choose Model
							</label>
							<div className="col-sm-4">
								<select className="form-control">
									<option>model 1</option>
									<option>model 2</option>
									<option>model 3</option>
									<option>model 4</option>
									<option>model 5</option>
								</select>
							</div>
						</div>

						<div className="form-group row push-top">
						    <label className="col-sm-2">
								Choose Type
							</label>
							<div className="col-sm-4">
								<select className="form-control">
									<option>Type 1</option>
									<option>Type 2</option>
									<option>Type 3</option>
									<option>Type 4</option>
									<option>Type 5</option>
								</select>
							</div>
						</div>

						<div className="form-group row push-top">
						    <label className="col-sm-2">
								Traffic
							</label>
							<div className="col-sm-4">
								<input className="form-control" type="text" />
							</div>
						</div>
						<BootstrapBtn
							role="primary"
							onClick={this.addNewABModel}>
							Save
						</BootstrapBtn>
					</div>
				</div>
				<div className="row push-top">
					<div className="col-sm-4">
						<BootstrapBtn
							role="primary"
							type="submit"
							onClick={this.postNewUser}>
							Save
						</BootstrapBtn>
					</div>
				</div>
			</div>
		)
	}
}
