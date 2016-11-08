import React, { Component } from 'react'

import { SongRow } from './song_row.jsx'

export class PlaylistPage extends Component {

  componentWillMount = () => {
    this.props.actions.fetchList(this.props.routeParams.id)
  }

  componentDidUpdate = (prevProps) => {
    const playerContent = this.props.player.playerContent;
    const prevPlayerContent = prevProps.player.playerContent;

    if ( playerContent != prevPlayerContent ) {
      let height;

      if ( playerContent ) {
        height = 400
      } else {
        height = 92
      }

      remote.getCurrentWindow().setSize(800, height);
    }
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
      return <SongRow key={song.id} songRow={song} index={index} player={this.props.player} fetchSong={this.props.actions.fetchSong} />
    })

    return (
      <div id='lc-playlist' style={{ height: this.props.player.playerContent ? '275px' : '0px' }} >
        { songRows }
      </div>
    )
  }
}
