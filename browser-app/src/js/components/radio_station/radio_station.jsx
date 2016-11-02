import React, { Component } from 'react'

export class RadioStation extends Component {

  render() {
    const { chart_key, country } = this.props.station

    return (
      <div className='lc-radio-station'>
        <div className='lc-playlist-row-time'>{ chart_key }</div>
        <div className='lc-playlist-row-time'>{ country }</div>
      </div>
    )
  }
}
