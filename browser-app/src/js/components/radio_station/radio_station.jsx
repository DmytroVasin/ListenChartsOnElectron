import React, { Component } from 'react'
import { Link } from 'react-router';

export class RadioStation extends Component {

  render() {
    const { id, name } = this.props.station

    return (
      <div className='lc-radio-station'>
        <Link to={`/stations/${id}/episodes`}>
          <div className={ 'lc-radio-station-preview station-' + name } ></div>

          <div className='mask'></div>

          <div className='circle'>
            <div className='circle-play'></div>
          </div>
        </Link>
      </div>
    )
  }
}
