import React, { Component } from 'react'

import { SongRow } from './song_row.jsx'

export class PlayListPage extends Component {

  componentWillMount() {
    this.props.fetchList()
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
      return <SongRow key={song.id} song={song} index={index} />
    })

    return (
      <div id='lc-player'>
        <div className='lc-playlist'>
          { songRows }
        </div>
      </div>
    )
  }
}
