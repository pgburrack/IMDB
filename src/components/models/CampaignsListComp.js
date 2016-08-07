import React, {Component, PropTypes} from 'react';

export default class CampaignsList extends Component {
	static propTypes = {
		campaignsList: React.PropTypes.array
	}
	render() {
		const {campaignsList} = this.props;

		let options = campaignsList.map(campaign => {
			return <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
		});

		options.unshift(<option key={-1} value="">Choose Campaign</option>);
		return <select className="form-control">
					{options}
				</select>
	}
}