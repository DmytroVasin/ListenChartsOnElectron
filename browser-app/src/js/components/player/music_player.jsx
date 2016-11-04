import React, { Component } from 'react'

import { formatSeconds, offsetLeft, soundCloudUrl } from '../../utils';
import { Link } from 'react-router';

export class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 0,
      isSeeking: false
    };
  }

  handleTogglePlay = () => {
    const audioElement = this.refs.audio;

    const { isPlaying } = this.props.player;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  componentDidMount = () => {
    const audioElement = this.refs.audio;

    audioElement.addEventListener('pause', this.handlePause, false);
    audioElement.addEventListener('play', this.handlePlay, false);
    audioElement.addEventListener('loadstart', this.handleLoadStart, false);
    audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
  }

  componentWillUnmount() {
    const audioElement = this.refs.audio;

    audioElement.removeEventListener('pause', this.handlePause, false);
    audioElement.removeEventListener('play', this.handlePlay, false);
    audioElement.addEventListener('loadstart', this.handleLoadStart, false);
    audioElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    audioElement.removeEventListener('timeupdate', this.handleTimeUpdate, false);
  }


  handlePlay = () => {
    this.props.actions.toggleIsPlaying(true)
  }

  handlePause = () => {
    this.props.actions.toggleIsPlaying(false)
  }

  handleLoadStart = () => {
    this.setState({
      duration: 0,
    });
  }

  handleLoadedMetadata = () => {
    const audioElement = this.refs.audio;

    this.setState({
      duration: Math.floor(audioElement.duration)
    });
  }

  handleTimeUpdate = () => {
    if (this.state.isSeeking) {
      return;
    }

    const audioElement = this.refs.audio;

    this.setState({
      currentTime: Math.floor(audioElement.currentTime)
    });
  }

  handleSeekMouseDown = (e) => {
    document.addEventListener('mousemove', this.handleSeekMouseMove);
    document.addEventListener('mouseup', this.handleSeekMouseUp);

    this.setState({
      isSeeking: true,
    });

    this.handleSeekMouseMove(e);
  }

  handleSeekMouseMove = (e) => {
    const seekBar = this.refs.seekBar;
    const diff = e.clientX - offsetLeft(seekBar);
    const pos = diff < 0 ? 0 : diff;
    let percent = pos / seekBar.offsetWidth;

    percent = percent > 1 ? 1 : percent;

    this.setState({
      currentTime: Math.floor(percent * this.state.duration)
    });
  }

  handleSeekMouseUp = () => {
    const audioElement = this.refs.audio;

    document.removeEventListener('mousemove', this.handleSeekMouseMove);
    document.removeEventListener('mouseup', this.handleSeekMouseUp);

    this.setState({
      isSeeking: false,
    }, () => {
      audioElement.currentTime = this.state.currentTime;
    });
  }

  render() {
    const { duration, currentTime } = this.state;
    const seekWidth = (currentTime / duration * 100) + '%';

    return (
      <div id='lc-player'>
        <audio id='lc-player-audio' ref='audio' controls='controls' preload='none' src={ soundCloudUrl(this.props.player.currentSongSCID) } />

        <div className='lc-player-badge'>
          <img src='http://www.webdesign-flash.ro/p/rap/content/thumbnails/small21.jpg' />
        </div>

        <div className='lc-player-controlls'>
          <div className='prev-btn'></div>
          <div className={this.props.player.isPlaying ? 'play-btn playing' : 'play-btn'} onClick={this.handleTogglePlay}></div>
          <div className='next-btn'></div>
        </div>

        <div className='lc-player-devider'></div>

        <div className='lc-player-controll-timeline'>
          <div className='player-header-controll-main-box-ticker-line'>
            <div className={this.props.player.isPlaying ? 'equalizer playing' : 'equalizer'} >
              <img src='http://www.webdesign-flash.ro/p/rap/content/minimal_skin_white/equalizer.png' />
            </div>
            <div className='text-ticker'>
              03. <span>Crush ft. Camden Cox</span> - Could This Be Real (Luminox Remix)
            </div>
          </div>

          <div className='player-header-controll-main-box-player'>
            <div className='player-header-controll-main-box-current-time'>{ formatSeconds(currentTime) }</div>

            <div className='player-header-controll-main-box-player-progress' onMouseDown={ this.handleSeekMouseDown } >
              <div className='player-progress-bar' ref='seekBar'>
                <div className='player-progress-bar-progress' style={{ width: seekWidth }} ></div>
                <div className='player-progress-bar-handler' style={{ left: seekWidth }}></div>
              </div>
            </div>

            <div className='player-header-controll-main-box-full-time'>{ formatSeconds(duration) }</div>
          </div>
        </div>

        <div className='lc-player-devider'></div>

        <div className='lc-player-options'>
          <div className='options-bar'>
            <Link to='/' className='options-btn playlist'></Link>
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
