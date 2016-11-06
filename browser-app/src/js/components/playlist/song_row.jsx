import React, { Component } from 'react'
import classNames from 'classnames';

import { SongRowProgress } from './song_row_progress.jsx'

export class SongRow extends Component {
  constructor(props) {
    super(props);
  }

  handlePlaySong = () => {
    const { id, place, artist, title } = this.props.song

    // TODO: WTF????
    this.props.fetchSong(id, artist + ' ' + title)
    this.props.setPlayerTitle({ title: title, artist: artist, place: place })
  }


  render() {
    const { place, artist, title  } = this.props.song;
    const isActive = (this.props.song.id == this.props.player.currentSongID)

    let renderProgressBar = isActive ? <SongRowProgress player={ this.props.player } /> : null;

    return (
      <div className={ classNames('lc-playlist-row', { 'active': isActive }) } onClick={ this.handlePlaySong }>
        { renderProgressBar }

        <div className='lc-playlist-row-content'>
          <div className={ classNames('play-pause', { 'playing': this.props.player.isPlaying }) }></div>
          <div className='title'>{ place }. <span>{ artist }</span> - { title }</div>
          <div className='time'>02:33</div>
        </div>
      </div>
    )
  }
}
