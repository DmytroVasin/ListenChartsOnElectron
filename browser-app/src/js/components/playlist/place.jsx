import React, { Component } from 'react'

import classNames from 'classnames';

export class Place extends Component {

  render() {
    const { place, previousPlace } = this.props;

    let classes = classNames('place', {
      'place-up': place < previousPlace,
      'place-down': place > previousPlace,
      'place-new': !previousPlace
    });

    return (
      <div className={classes}></div>
    );
  }
}
