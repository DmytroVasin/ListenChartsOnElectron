import React, { Component } from 'react'

import { SongRow } from './song_row.jsx'

export class PlaylistPage extends Component {

  componentWillMount = () => {
    this.props.actions.fetchList(this.props.routeParams.id)
    this.props.actions.updateCurrentStationId(this.props.routeParams.id)
  }

  render() {
    const { songs, error, loading } = this.props.playlist

    if (loading || !songs.length) {
      return null
    }

    if (error) {
      return <div>Error: {error}</div>
    }

    let songRows = songs.map( (song, index) => {
      return <SongRow key={song.id} songRow={song} index={index} player={this.props.player} playSong={this.props.actions.playSong} />
    })

    return (
      <div id='lc-playlist' >
        { songRows }
      </div>
    )
  }
}
