import React, { Component } from 'react'

export class RadioStation extends Component {

  render() {
    const { chart_key, country } = this.props.station

    return (
      <div className='lc-radio-station'>
        <div>{ chart_key }</div>
        <div>{ country }</div>
      </div>
    )
  }
}
