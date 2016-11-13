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

  renderCart = () => {
    if ( this.props.songRow.sc_permalink_url ) {
      return <div className='cart' onClick={ this.handleGoBuyTrack }></div>;
    } else {
      return null;
    }
  }

  renderDownload = () => {
    if ( this.props.songRow.sc_stream_url ) {
      return <div className='download' onClick={ this.handleDownload }></div>;
    } else {
      return null;
    }
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
          { this.renderDownload() }
          { this.renderCart() }
          <Place place={song.place} previousPlace={song.previous_place} />
          <div className='time'>{ formatSeconds(song.sc_duration) }</div>
        </div>
      </div>
    )
  }
}
