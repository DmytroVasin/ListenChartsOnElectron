import React, { Component } from 'react'

export class SongRow extends Component {

  componentWillMount() {

  }

  render() {
    const { place, artist, title  } = this.props.song

    return (
      <li className='amazingaudioplayer-track-item'>{ place }. { title } <span>02:34</span></li>
    )
  }
}
