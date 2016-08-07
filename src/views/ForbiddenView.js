import React, { Component } from 'react';

export default class ForbiddenView extends Component {
  render () {
    return (
      <div>
        <div className='header' style={{ fontSize: '6rem', margin: '8rem', textAlign: 'center' }}>
          404 page
        </div>
      </div>
    );
  }
}
