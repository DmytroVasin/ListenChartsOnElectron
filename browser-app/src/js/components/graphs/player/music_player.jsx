// http://www.webdesign-flash.ro/p/rap/index.html#/player1?catid=0&trackid=19
// http://www.webdesign-flash.ro/p/rap/content/minimal_skin_dark/equalizer.png

import React, { Component } from 'react'

import { MusicPlayerList } from './music_player_list.jsx'

export class MusicPlayer extends Component {

  componentWillMount() {
    this.props.fetchList()
  }

  render() {
    return (

      <div id='lc-player'>
        <div className='lc-header'>
          <div className='lc-header-badge'>
            <img src='http://www.webdesign-flash.ro/p/rap/content/thumbnails/small21.jpg' />
          </div>

          <div className='lc-header-controlls'>
            <div className='prev-btn'></div>
            <div className='play-btn'></div>
            <div className='next-btn'></div>
          </div>

          <div className='lc-header-devider'></div>

          <div className='lc-header-controll-timeline'>
            <div className='player-header-controll-main-box-ticker-line'>
              <div className='equalizer playing'>
                <img src='http://www.webdesign-flash.ro/p/rap/content/minimal_skin_white/equalizer.png' />
              </div>
              <div className='text-ticker'>
                03. <span>Crush ft. Camden Cox</span> - Could This Be Real (Luminox Remix)
              </div>
            </div>

            <div className='player-header-controll-main-box-player'>
              <div className='player-header-controll-main-box-current-time'>00:16</div>

              <div className='player-header-controll-main-box-player-progress'>
                <div className='player-progress-bar'>
                  <div className='player-progress-bar-progress'>
                    <div className='player-progress-bar-handler'>
                    </div>
                  </div>
                </div>
              </div>

              <div className='player-header-controll-main-box-full-time'>02:33</div>
            </div>
          </div>

          <div className='lc-header-devider'></div>

          <div className='lc-header-options'>
            <div className='options-bar'>
              <div className='options-btn playlist'></div>
              <div className='options-btn radiostations'></div>
              <div className='options-btn replay'></div>
              <div className='options-btn shuffle'></div>
              <div className='options-btn download'></div>
              <div className='options-btn visit-site'></div>
            </div>

            <div className='volume-bar'>
              <div className='volume-bar-btn'></div>

              <div className='volume-progress-bar-wrapper'>
                <div className='volume-progress-bar'>
                  <div className='volume-progress-bar-progress'>
                    <div className='volume-progress-bar-handler'>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className='lc-playlist'>

          <div className='lc-playlist-row'>
            <div className='lc-playlist-row-play-pause'></div>
            <div className='lc-playlist-row-title'>03. <span>Crush ft. Camden Cox</span> - Could This Be Real (Luminox Remix)</div>
            <div className='lc-playlist-row-time'>02:33</div>
          </div>

          <div className='lc-playlist-row active'>
            <div className='lc-playlist-row-play-pause'></div>
            <div className='lc-playlist-row-title'>03. <span>Crush ft. Camden Cox</span> - Could This Be Real (Luminox Remix)</div>
            <div className='lc-playlist-row-time'>02:33</div>
          </div>

          <div className='lc-playlist-row'>
            <div className='lc-playlist-row-play-pause'></div>
            <div className='lc-playlist-row-title'>03. <span>Crush ft. Camden Cox</span> - Could This Be Real (Luminox Remix)</div>
            <div className='lc-playlist-row-time'>02:33</div>
          </div>

        </div>

      </div>
    )
  }
}
