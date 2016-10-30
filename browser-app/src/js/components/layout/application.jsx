import React, { Component } from 'react'

import Spinner from '../layout/spinner.jsx';

export default class Application extends Component {
  render() {
    return (
      <div className='window'>
        <div className='window-container'>
          { this.props.children }
        </div>
      </div>
    );
  }
}
// <Spinner />
