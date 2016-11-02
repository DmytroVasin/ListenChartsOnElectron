import React, { Component } from 'react'

import { MusicPlayerHeader } from '../graphs/player/music_player_header.jsx';

export default class Application extends Component {
  render() {
    return (
      <div className='window'>
        <div className='window-container'>

          <div id='music-box-container'>
            <div className='popover'>
              <div className='arrow'></div>

              <div className='popover-content'>
                <MusicPlayerHeader />

                { this.props.children }
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

