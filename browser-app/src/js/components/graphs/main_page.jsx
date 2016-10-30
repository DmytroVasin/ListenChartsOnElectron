import React, { Component } from 'react'

import { MusicPlayer } from './player/music_player.jsx'

export class MainPage extends Component {

  componentWillMount() {
    // this.props.actions.fetchGraph()
  }

  render() {
    return (
      <div id='music-box-container'>
        <div className='popover'>
          <div className='arrow'></div>
          <div className='popover-content'>
            <MusicPlayer />
          </div>
        </div>
      </div>
    )
  }
}
