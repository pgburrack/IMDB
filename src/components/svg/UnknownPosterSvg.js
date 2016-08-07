/**
 * Generic unknown poster svg
 */
import React, { Component } from 'react';

export default class UnknownPosterSvg extends Component {
  static propTypes = {
    color: React.PropTypes.string
  }

  render () {
    const {color} = this.props;

    return (
      <svg
        version='1.0'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 342.000000 513.000000'
        preserveAspectRatio='xMidYMid meet'>
        <g
          transform='translate(0.000000,513.000000) scale(0.100000,-0.100000)'
          fill={color}
          stroke='none'>
          <path d='M0 2565 l0 -2565 1710 0 1710 0 0 2565 0 2565 -1710 0 -1710 0 0
          -2565z m1955 1430 c175 -31 310 -94 419 -196 132 -124 194 -268 203 -474 6
          -149 -11 -238 -66 -350 -84 -169 -194 -266 -506 -446 -60 -35 -135 -89 -167
          -119 -54 -52 -58 -59 -58 -101 0 -33 8 -58 29 -92 59 -92 63 -179 11 -261 -35
          -54 -105 -98 -169 -104 -76 -7 -127 13 -191 74 -153 145 -193 365 -102 553 33
          69 159 198 257 262 290 190 336 223 393 283 81 84 114 154 114 244 1 86 -14
          141 -55 193 -122 161 -498 185 -656 43 -65 -59 -90 -113 -106 -232 -14 -109
          -27 -142 -77 -189 -91 -87 -227 -85 -319 7 -59 59 -74 110 -66 233 8 118 27
          191 79 297 60 123 168 230 298 294 103 50 213 82 336 96 97 11 292 3 399 -15z
          m-220 -2358 c93 -27 155 -132 155 -262 0 -180 -95 -275 -275 -275 -171 0 -264
          81 -273 240 -10 177 57 280 201 310 49 10 134 5 192 -13z'/>
        </g>
      </svg>
    );
  }
}
