import React, { Component } from 'react'
import { Link } from 'react-router';

export class RadioStation extends Component {

  render() {
    const { id, chart_key } = this.props.station

    return (
      <div className='lc-radio-station'>
        <Link to={`/radiostation/${id}`}>
          <div className={ 'lc-radio-station-preview station-' + chart_key } ></div>

          <div className='mask'></div>

          <button className='circle'>
            <i className='icon-play'>></i>
          </button>
        </Link>
      </div>
    )
  }
}
