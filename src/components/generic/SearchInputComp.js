/**
 * Generic Search input
 */

import React, {Component} from 'react';
import classes from 'styles/generic/SearchInput.scss';

export default class SearchInput extends Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    showGlyphicon: React.PropTypes.bool,
    glyphiconSide: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    defaultValue: React.PropTypes.string
  }

  static defaultProps = {
    placeholder: '',
    glyphiconSide: false,
    showGlyphicon: true
  }

  // constructor(props) {
  //   super(props);
  // }

  changeValue = (e) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e.target.value.trim());
    }
  }

  getSideClassName = () => {
    return !this.props.glyphiconSide ? classes['right-addon'] : classes['left-addon'];
  }

  render () {
    const {placeholder, showGlyphicon} = this.props;

    let Glyphicon;
    if (showGlyphicon) {
      Glyphicon = (
        <div className={classes['searchicon'].concat(' ', this.getSideClassName())}>
          <svg fill='#000000' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'>
            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/>
            <path d='M0 0h24v24H0z' fill='none'/>
          </svg>
        </div>);
    }

    return (
      <div className={classes['inner-addon']}>
        {Glyphicon}
        <input type='text'
          className='form-control'
          onChange={this.changeValue}
          placeholder={placeholder}/>
      </div>
    );
  }
}
