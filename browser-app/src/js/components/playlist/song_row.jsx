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

  handleDownload = (e) => {
    e.stopPropagation()
    ipcRenderer.send('dowload-file-from-url', this.props.songRow.sc_stream_url);
  }

  handleGoBuyTrack = (e) => {
    e.stopPropagation()

    if (this.props.songRow.sc_permalink_url) {
      shell.openExternal(this.props.songRow.sc_permalink_url);
    }
  }

  renderPlayPause = (isActive) => {
    const { isPlaying } = this.props.player

    if (isActive && isPlaying) {
      return <div className='icon-pause'></div>
    } else {
      return <div className='icon-play'></div>
    }
  }

  renderTitle = () => {
    const { place, artist, title } = this.props.songRow;

    return <div className='title'>{ place }. <span>{ artist }</span> - { title }</div>;
  }

  renderCart = () => {
    if ( this.props.songRow.sc_permalink_url ) {
      return <div className='icon-link' onClick={ this.handleGoBuyTrack }></div>;
    } else {
      return null;
    }
  }

  renderDownload = () => {
    if ( this.props.songRow.sc_stream_url ) {
      return <div className='icon-download' onClick={ this.handleDownload }></div>;
    } else {
      return null;
    }
  }

  renderPlace = () => {
    const { place, previous_place } = this.props.songRow

    if ( !place ) {
      return null;
    } else if ( !previous_place ) {
      return <div className='icon-fire'></div>;
    } else if ( place < previous_place ) {
      return <div className='icon-arrow-up'></div>;
    } else {
      return <div className='icon-arrow-down'></div>;
    }
  }

  renderTime = () => {
    const { sc_duration } = this.props.songRow;
    return <div className='time'>{ formatSeconds(sc_duration) }</div>;
  }

  render() {
    const { player } = this.props
    const song = this.props.songRow;
    const isActive = (song.id == player.song.id)

    let renderProgressBar = isActive ? <SongRowProgress player={ player } /> : null;

    return (
      <div className={ classNames('lc-playlist-row', { 'active': isActive }) } onClick={ this.handlePlaySong }>
        { renderProgressBar }

        <div className='lc-playlist-row-content'>
          { this.renderPlayPause(isActive) }
          { this.renderTitle() }
          { this.renderDownload() }
          { this.renderCart() }
          { this.renderPlace() }
          { this.renderTime() }
        </div>
      </div>
    )
  }
}
