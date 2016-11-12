import React, { Component } from 'react'
import classNames from 'classnames';

import { SongRowProgress } from './song_row_progress.jsx'
import { Place } from './place.jsx'

import { formatSeconds } from '../../utils';

export class SongRow extends Component {
  constructor(props) {
    super(props);
  }

  handlePlaySong = () => {
    this.props.playSong(this.props.songRow)
  }


  render() {
    const song = this.props.songRow;
    const isActive = (song.id == this.props.player.song.id)

    let renderProgressBar = isActive ? <SongRowProgress player={ this.props.player } /> : null;

    return (
      <div className={ classNames('lc-playlist-row', { 'active': isActive }) } onClick={ this.handlePlaySong }>

        <div className='lc-playlist-row-content'>
          { renderProgressBar }

          <div className={ classNames('play-pause', { 'playing': this.props.player.isPlaying }) }></div>
          <div className='title'>{ song.place }. <span>{ song.artist }</span> - { song.title }</div>
          <Place place={song.place} previousPlace={song.previous_place} />
          <div className='time'>{ formatSeconds(song.sc_duration) }</div>
        </div>
      </div>
    )
  }
}
