import React, { Component } from 'react'
import classNames from 'classnames';

import { SongRowProgress } from './song_row_progress.jsx'
import { formatSeconds } from '../../utils';

export class SongRow extends Component {
  constructor(props) {
    super(props);
  }

  handlePlaySong = () => {
    this.props.playSong(this.props.songRow)
  }


  render() {
    const { place, artist, title, sc_duration } = this.props.songRow;
    const isActive = (this.props.songRow.id == this.props.player.song.id)


    let renderProgressBar = isActive ? <SongRowProgress player={ this.props.player } /> : null;

    return (
      <div className={ classNames('lc-playlist-row', { 'active': isActive }) } onClick={ this.handlePlaySong }>

        <div className='lc-playlist-row-content'>
          { renderProgressBar }

          <div className={ classNames('play-pause', { 'playing': this.props.player.isPlaying }) }></div>
          <div className='title'>{ place }. <span>{ artist }</span> - { title }</div>
          <div className='time'>{ formatSeconds(sc_duration) }</div>
        </div>
      </div>
    )
  }
}
