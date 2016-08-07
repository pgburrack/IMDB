/**
 * Arrow Down svg
 */
import React, { Component } from 'react';

export default class ArrowDownSvg extends Component {
  static propTypes = {
    color: React.PropTypes.string,
    width: React.PropTypes.string
  }

  render () {
    const {color, width} = this.props;

    return (
      <svg fill={color} height={width} viewBox='0 0 24 24' width={width} xmlns='http://www.w3.org/2000/svg'>
          <path d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z'/>
          <path d='M0-.75h24v24H0z' fill='none'/>
      </svg>
    );
  }
}


