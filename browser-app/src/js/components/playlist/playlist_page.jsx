import React, { Component } from 'react'

import { SongRow } from './song_row.jsx'

export class PlayListPage extends Component {

  componentWillMount() {
    this.props.actions.fetchList(this.props.routeParams.id)
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
      return <SongRow key={song.id} song={song} index={index} fetchSong={this.props.actions.fetchSong} />
    })

    return (
      <div id='lc-playlist'>
        { songRows }
      </div>
    )
  }
}
