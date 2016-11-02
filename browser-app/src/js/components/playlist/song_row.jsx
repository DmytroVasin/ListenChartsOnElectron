import React, { Component } from 'react'

export class SongRow extends Component {

  render() {
    const { place, artist, title  } = this.props.song

    return (
      <div className='lc-playlist-row'>
        <div className='lc-playlist-row-play-pause'></div>
        <div className='lc-playlist-row-title'>{ place }. <span>{ artist }</span> - { title }</div>
        <div className='lc-playlist-row-time'>02:33</div>
      </div>
    )
  }
}
