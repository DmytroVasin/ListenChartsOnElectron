import React, { Component } from 'react'

export class MusicPlayerHeader extends Component {

  handleTogglePause = () => {
    this.props.togglePause()
  }


  componentDidMount = () => {
    const audioElement = this.refs.audio;

    audioElement.addEventListener('pause', this.handlePause, false);
    audioElement.addEventListener('play', this.handlePlay, false);
  }

  componentWillUnmount() {
    const audioElement = this.refs.audio;
    audioElement.removeEventListener('pause', this.handlePause, false);
    audioElement.removeEventListener('play', this.handlePlay, false);
  }


  handlePlay = () => {
    this.props.togglePause()
  }

  handlePause = () => {
    console.log('................')
    this.props.togglePause()
  }

  render() {
    return (
      <div className='lc-header'>
        <audio id='lc-player-audio' ref='audio' controls='controls' src="https://goo.gl/e5gulZ"></audio>

        <div className='lc-header-badge'>
          <img src='http://www.webdesign-flash.ro/p/rap/content/thumbnails/small21.jpg' />
        </div>

        <div className='lc-header-controlls'>
          <div className='prev-btn'></div>
          <div className={this.props.playing ?  'play-btn playing' : 'play-btn'} onClick={this.handleTogglePause}></div>
          <div className='next-btn'></div>
        </div>

        <div className='lc-header-devider'></div>

        <div className='lc-header-controll-timeline'>
          <div className='player-header-controll-main-box-ticker-line'>
            <div className={this.props.playing ?  'equalizer playing' : 'equalizer'} >
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
    )
  }
}
