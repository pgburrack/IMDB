import React, {Component} from 'react';
import classes from 'styles/generic/RoundSpinner.scss';

/**
 * Spinner - CSS spinner animation
 */
export default class Spinner extends Component {
  static propTypes = {
    className: React.PropTypes.string
  };
  render () {
    return (
      <div className={classes['loader'].concat(' ' + this.props.className)}></div>
    );
  }
}
