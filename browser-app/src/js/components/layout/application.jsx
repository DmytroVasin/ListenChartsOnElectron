import React, { Component } from 'react'

import MusicPlayerContainer from '../../containers/music_player_container.js'
import SpinnerContainer from '../../containers/spinner_container.js'

export default class Application extends Component {
  render() {
    return (
      <div className='window'>
        <div className='window-container arrow'>
          <SpinnerContainer />
          <MusicPlayerContainer />

          <div className='window-content'>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}
