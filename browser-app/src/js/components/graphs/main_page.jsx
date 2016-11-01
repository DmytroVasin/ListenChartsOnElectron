import React, { Component } from 'react'

import { MusicPlayer } from './player/music_player.jsx'

export class MainPage extends Component {

  render() {
    return (
      <div id='music-box-container'>
        <div className='popover'>
          <div className='arrow'></div>
          <div className='popover-content'>
            <MusicPlayer fetchList={this.props.actions.fetchList} playList={this.props.playList} togglePause={this.props.actions.togglePause} playing={this.props.playing} />
          </div>
        </div>
      </div>
    )
  }
}
