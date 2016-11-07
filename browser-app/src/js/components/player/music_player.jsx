import React, { Component } from 'react'
import classNames from 'classnames';

import { formatSeconds, offsetLeft, soundCloudUrl } from '../../utils';
import { Link } from 'react-router';

export class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSeeking: false,
      replay: false,
      shuffle: false
    };
  }

  togglePlay = () => {
    const audioElement = this.refs.audio;

    const { isPlaying } = this.props.player;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  toggleReplay = () => {
    this.setState({ replay: !this.state.replay });
  }

  toggleShuffle = () => {
    this.setState({ shuffle: !this.state.shuffle });
  }

  componentDidMount = () => {
    const audioElement = this.refs.audio;

    audioElement.addEventListener('pause', this.handlePause, false);
    audioElement.addEventListener('play', this.handlePlay, false);
    audioElement.addEventListener('loadstart', this.handleLoadStart, false);
    audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
  }

  // TODO: Too much call'
  componentDidUpdate = (prevProps) => {
    const songSCID = this.props.player.song.scid;

    if (!songSCID) {
      return;
    }

    const prevSongSCID = prevProps.player.song.scid;
    const audioElement = this.refs.audio;

    if (songSCID != prevSongSCID) {
      audioElement.play();
    }
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
    this.props.actions.toggleIsPlaying(true);
  }

  handlePause = () => {
    this.props.actions.toggleIsPlaying(false)
  }

  handleLoadStart = () => {
    this.props.actions.timeUpdate(0)
    this.props.actions.durationUpdate(0)
  }

  handleNextSong = () => {
    this.props.actions.changeSong('NEXT_SONG')
  }

  handleLoadedMetadata = () => {
    const audioElement = this.refs.audio;

    this.props.actions.durationUpdate( Math.floor(audioElement.duration) )
  }

  handleTimeUpdate = () => {
    if (this.state.isSeeking) {
      return;
    }

    const audioElement = this.refs.audio;
    const currentTime = Math.floor(audioElement.currentTime);

    if (currentTime === this._currentTime) {
      return;
    }

    this._currentTime = currentTime;

    this.props.actions.timeUpdate(currentTime)
  }

  handleSeekMouseDown = (e) => {
    document.addEventListener('mousemove', this.handleSeekMouseMove);
    document.addEventListener('mouseup', this.handleSeekMouseUp);

    this.setState({
      isSeeking: true
    });

    this.handleSeekMouseMove(e);
  }

  handleSeekMouseMove = (e) => {
    const seekBar = this.refs.seekBar;
    const diff = e.clientX - offsetLeft(seekBar);
    const pos = diff < 0 ? 0 : diff;
    let percent = pos / seekBar.offsetWidth;

    percent = percent > 1 ? 1 : percent;

    this.props.actions.timeUpdate(Math.floor(percent * this.props.player.duration))
  }

  handleSeekMouseUp = () => {
    const audioElement = this.refs.audio;

    document.removeEventListener('mousemove', this.handleSeekMouseMove);
    document.removeEventListener('mouseup', this.handleSeekMouseUp);

    this.setState({
      isSeeking: false,
    }, () => {
      audioElement.currentTime = this.props.player.currentTime;
    });
  }

  renderSongTitle = () => {
    const { place, artist, title  } = this.props.song;

    if (place && artist && title) {
      return `${ place }. <span>${ artist }</span> - ${ title }`;
    } else {
      return '';
    }
  }

  render() {
    const { duration, currentTime, isPlaying } = this.props.player;
    const { scid } = this.props.song;
    console.log('---------------')
    console.log(this.props.song)
    console.log('---------------')

    const seekWidth = currentTime === 0 ? 0 : Math.floor(currentTime / duration * 100);

    return (
      <div id='lc-player'>
        <audio id='lc-player-audio' ref='audio' controls='controls' src={ soundCloudUrl(scid) } />

        <div className='lc-player-badge'>
          <img src='http://www.webdesign-flash.ro/p/rap/content/thumbnails/small21.jpg' />
        </div>

        <div className='lc-player-controlls'>
          <div className='prev-btn'></div>
          <div className={ classNames('play-btn', { 'playing': isPlaying }) } onClick={ this.togglePlay }></div>
          <div className='next-btn' onClick={ this.handleNextSong }></div>
        </div>

        <div className='lc-player-devider'></div>

        <div className='lc-player-controll-timeline'>
          <div className='player-header-controll-main-box-ticker-line'>
            <div className={ classNames('equalizer', { 'playing': isPlaying }) }>
              <img src='http://www.webdesign-flash.ro/p/rap/content/minimal_skin_white/equalizer.png' />
            </div>
            <div className='text-ticker' dangerouslySetInnerHTML={{ __html: this.renderSongTitle() }}></div>
          </div>

          <div className='player-header-controll-main-box-player'>
            <div className='player-header-controll-main-box-current-time'>{ formatSeconds(currentTime) }</div>

            <div className='player-header-controll-main-box-player-progress' onMouseDown={ this.handleSeekMouseDown } >
              <div className='player-progress-bar' ref='seekBar'>
                <div className='player-progress-bar-progress' style={{ width: `${seekWidth}%` }} ></div>
                <div className='player-progress-bar-handler' style={{ left: `${seekWidth}%` }}></div>
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
            <div className={ classNames('options-btn', 'replay', { 'active': this.state.replay }) } onClick={ this.toggleReplay }></div>
            <div className={ classNames('options-btn', 'shuffle', { 'active': this.state.shuffle }) } onClick={ this.toggleShuffle }></div>
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
