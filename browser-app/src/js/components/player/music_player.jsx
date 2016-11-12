import React, { Component } from 'react'
import classNames from 'classnames';

import { formatSeconds, offsetLeft, soundCloudUrl, soundCloudImage } from '../../utils';
import { Link } from 'react-router';

export class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSeeking: false
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

  handleToggleReplay = () => {
    this.props.actions.toggleReplay();
  }

  handleToggleShuffle = () => {
    this.props.actions.toggleShuffle();
  }

  handleToggleMute = () => {
    this.props.actions.toggleMute();
  }

  togglePlayerContent = () => {
    this.props.actions.togglePlayerContent()
  }

  handleVisitSite = () => {
    shell.openExternal('http://beta.listencharts.com/');
  }

  componentDidMount = () => {
    const audioElement = this.refs.audio;

    audioElement.volume = this.props.player.volume;

    audioElement.addEventListener('play', this.handlePlay, false);
    audioElement.addEventListener('pause', this.handlePause, false);
    audioElement.addEventListener('ended', this.handleNextSong, false);
    audioElement.addEventListener('loadstart', this.handleLoadStart, false);
    audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
    audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
  }

  // TODO: Too much call'
  componentDidUpdate = (prevProps) => {
    const audioElement = this.refs.audio;

    const songId = this.props.player.song.id;
    const prevSongId = prevProps.player.song.id;

    const { volume, mute } = this.props.player;

    if (!audioElement) {
      return;
    }

    if (!songId) {
      return;
    }

    audioElement.volume = mute ? 0 : volume;

    if (songId != prevSongId) {
      audioElement.play();
    }


    // TODO: ЭТА ХУЙНЯ НЕ ДОЛЖНА БЫТЬ ТУТ!!
    // Это не принадлежит плееру - а вообще APP

    // Turn player OFF
    if (prevProps.player.isPlaying && !this.props.player.isPlaying) {
      ipcRenderer.send('update-image-tray-window-event', false);
    }
    // Turn player ON
    if (!prevProps.player.isPlaying && this.props.player.isPlaying) {
      ipcRenderer.send('update-image-tray-window-event', true);
    }
  }

  componentWillUnmount() {
    const audioElement = this.refs.audio;

    audioElement.removeEventListener('play', this.handlePlay, false);
    audioElement.removeEventListener('pause', this.handlePause, false);
    audioElement.removeEventListener('ended', this.handleNextSong, false);
    audioElement.removeEventListener('loadstart', this.handleLoadStart, false);
    audioElement.removeEventListener('timeupdate', this.handleTimeUpdate, false);
    audioElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata, false);
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
    const { replay, shuffle } = this.props.player;

    if (replay) {
      this.props.actions.changeSong('REPLAY_SONG')
    } else if (shuffle) {
      this.props.actions.changeSong('SHUFFLE_SONG')
    } else {
      this.props.actions.changeSong('NEXT_SONG')
    }
  }

  handlePrevSong = () => {
    const { replay, shuffle } = this.props.player;

    if (replay) {
      this.props.actions.changeSong('REPLAY_SONG')
    } else if (shuffle) {
      this.props.actions.changeSong('SHUFFLE_SONG')
    } else {
      this.props.actions.changeSong('PREV_SONG')
    }
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
    const movingBar = this.refs.seekBar;

    const diff = e.clientX - offsetLeft(movingBar);
    const pos = diff < 0 ? 0 : diff;
    let percent = pos / movingBar.offsetWidth;

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

  handleVolumeMouseDown = (e) => {
    document.addEventListener('mousemove', this.handleVolumeMouseMove);
    document.addEventListener('mouseup', this.handleVolumeMouseUp);

    this.setState({
      isVolumeChanging: true
    });

    this.handleVolumeMouseMove(e);
  }
  handleVolumeMouseMove = (e) => {
    const audioElement = this.refs.audio;
    const movingBar = this.refs.volumeBar;

    const diff = e.clientX - offsetLeft(movingBar);
    const pos = diff < 0 ? 0 : diff;
    let percent = pos / movingBar.offsetWidth;

    percent = percent > 1 ? 1 : percent;

    this.props.actions.volumeUpdate(percent);
  }
  handleVolumeMouseUp = (e) => {
    document.removeEventListener('mousemove', this.handleVolumeMouseMove);
    document.removeEventListener('mouseup', this.handleVolumeMouseUp);

    this.setState({
      isVolumeChanging: false
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
    const { duration, currentTime, isPlaying, replay, shuffle, volume, mute } = this.props.player;
    const { sc_stream_url, sc_image_url, sc_duration } = this.props.song;

    const seekWidth = currentTime === 0 ? 0 : Math.floor(currentTime / duration * 100);
    const volumeWidth = volume * 100;

    return (
      <div id='lc-player'>
        <audio id='lc-player-audio' ref='audio' controls='controls' src={ sc_stream_url } />

        <div className='lc-player-badge'>
          <img src={ soundCloudImage(sc_image_url) } />
        </div>

        <div className='lc-player-controlls'>
          <div className='prev-btn' onClick={ this.handlePrevSong }></div>
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

            <div className='player-header-controll-main-box-full-time'>{ formatSeconds(duration || sc_duration) }</div>
          </div>
        </div>

        <div className='lc-player-devider'></div>

        <div className='lc-player-options'>
          <div className='options-bar'>
            <Link to='/' className='options-btn playlist'></Link>
            <div className='options-btn radiostations' onClick={ this.togglePlayerContent }></div>
            <div className={ classNames('options-btn', 'replay', { 'active': replay }) } onClick={ this.handleToggleReplay }></div>
            <div className={ classNames('options-btn', 'shuffle', { 'active': shuffle }) } onClick={ this.handleToggleShuffle }></div>
            <div className='options-btn download'></div>
            <div className='options-btn visit-site' onClick={ this.handleVisitSite }></div>
          </div>

          <div className='volume-bar'>
            <div className={ classNames('volume-bar-btn', { 'mute': mute }) } onClick={ this.handleToggleMute }></div>

            <div className='volume-progress-bar-wrapper' onMouseDown={ this.handleVolumeMouseDown } >
              <div className='volume-progress-bar' ref='volumeBar'>
                <div className='volume-progress-bar-progress' style={{ width: `${volumeWidth}%` }} ></div>
                <div className='volume-progress-bar-handler' style={{ left: `${volumeWidth}%` }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
