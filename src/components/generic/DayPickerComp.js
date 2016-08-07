import React, { Component } from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';

export default class RangeDayPicker extends Component {
  static propTypes = {
    actions: React.PropTypes.object,
    showPicker: React.PropTypes.string,
    eventCloseDatePicker: React.PropTypes.func,
    className: React.PropTypes.string
  }

  constructor (props) {
    super(props);
    this.state = {
      from: null,
      to: null
    };
  }

  eventDayClick = (e, day) => {
    if (moment() < moment(day)) {
      day = new Date(moment().unix() * 1000);
    }
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  eventResetClick = (e) => {
    e.preventDefault();
    this.setState({
      from: null,
      to: null
    });
  }

  eventApplyDate = (e) => {
    let end = moment(this.state.to).unix();
    let start = moment(this.state.from).unix();
    this.props.actions.setDateRange({ start: start, end: end });
    this.props.eventCloseDatePicker();
  }

  render () {
    const { from, to } = this.state;
    const { showPicker, className } = this.props;
    const modifiers = {
      selected: (day) => DateUtils.isDayInRange(day, this.state)
    };
    return (
      <div className={`RangeDayPicker ${showPicker || ''} ${className || ''}`}>
        {!from && !to && <p className='headerTitle'>Please select the <strong>first day</strong>.</p>}
        {from && !to && <p className='headerTitle'>Please select the <strong>last day</strong>.</p>}
        {from && to &&
          <div className='dateHeader'>
            <span className='fromDateLabel'>from</span>
            <span className='fromDate'>{moment(from).format('MMM.DD, YYYY')}</span>
            <span className='toDateLabel'>to</span>
            <span className='toDate'>{moment(to).format('MMM.DD, YYYY')}</span>
            <button classNam='resetBtn' onClick={this.eventResetClick.bind(this)}>clear</button>
            <button className='applyBtn' onClick={this.eventApplyDate.bind(this)}>apply</button>
          </div>
        }
        <DayPicker
          ref='daypicker'
          numberOfMonths={2}
          modifiers={modifiers}
          onDayClick={this.eventDayClick.bind(this)}
        />
      </div>
    );
  }
}
