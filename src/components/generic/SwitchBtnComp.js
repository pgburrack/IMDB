import React from 'react';
import classes from 'styles/generic/Switch.scss';

/**
 *  switch button component
 */
export default class SwitchBNtn extends React.Component {
  static propTypes = {
    activeState: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    switchKey: React.PropTypes.string,
    checkedLink: React.PropTypes.shape({
      value: React.PropTypes.bool.isRequired,
      requestChange: React.PropTypes.func.isRequired
    })
  };
  static defaultProps = {
    activeState: false,
    onChange: function () {},
    checkedLink: null
  };
  // constructor(props) {
  //   super(props);
  // }
  getCheckedLink () {
    return this.props.checkedLink || {
      value: this.props.activeState,
      requestChange: this.props.onChange
    };
  }
  render () {
    const { switchKey } = this.props;

    return (
      <div className='switch'>
        <input
          type='checkbox'
          id={'toggle_' + switchKey}
          className={`${classes['cmn-toggle']} ${classes['cmn-toggle-round-flat']}`}
          checkedLink={this.getCheckedLink()} />
        <label htmlFor={'toggle_' + switchKey}>
          <span className={classes['onBtn']}>ON</span>
          <span className={classes['offBtn']}>OFF</span>
        </label>
      </div>
    );
  }
}
