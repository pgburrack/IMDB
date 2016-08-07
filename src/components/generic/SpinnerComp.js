import React, {Component} from 'react';
import 'styles/generic/Spinner.scss';

/**
 * Spinner - CSS spinner animation
 */
export default class Spinner extends Component {
	render(){
		return (
			<div className="spinner">
				<div className="bounce1"></div>
				<div className="bounce2"></div>
				<div className="bounce3"></div>
			</div>
		);
	}
}