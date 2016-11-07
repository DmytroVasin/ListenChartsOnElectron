import React, { Component } from 'react'

import MusicPlayerContainer from '../../containers/music_player_container.js'

export default class Application extends Component {
  render() {
    return (
      <div className='window'>
        <div className='window-container'>

          <div className='popover popover-arrow'>

            <div className='popover-content'>
              <MusicPlayerContainer />

              { this.props.children }
            </div>
          </div>

        </div>
      </div>
    );
  }
}
