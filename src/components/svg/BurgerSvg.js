/**
 * Burger svg
 */
import React, { Component } from 'react';

export default class BurgerSvg extends Component {
  static propTypes = {
    color: React.PropTypes.string,
    width: React.PropTypes.string
  }

  render () {
    const {color, width} = this.props;

    return (
      <svg fill={color} height={width} viewBox='0 0 24 24' width={width} xmlns='http://www.w3.org/2000/svg'>
        <path d='M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z'/>
        <path d='M0 0h24v24H0z' fill='none'/>
      </svg>
    );
  }
}

