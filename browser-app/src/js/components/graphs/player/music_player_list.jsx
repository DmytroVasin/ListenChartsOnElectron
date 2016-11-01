import React, { Component } from 'react'

import { SongRow } from './song_row.jsx'

export class MusicPlayerList extends Component {

  componentWillMount() {

  }

  render() {
    const { songs, error, loading } = this.props.playList

    if (loading || !songs.length) {
      return null
    }

    if (error) {
      return <div>Error: {error}</div>
    }

    let songRows = songs.map( (song, index) => {
      return <SongRow key={song.id}
                       song={song}
                       index={index} />
    })

    return (
      <div className="amazingaudioplayer-track-song-list">
        <div className="amazingaudioplayer-track-song-list-devider"></div>
        <ul className='amazingaudioplayer-tracks'>
          { songRows }
        </ul>
      </div>
    )
  }
}
