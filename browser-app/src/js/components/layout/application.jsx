import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import classNames from 'classnames';

import MusicPlayerContainer from '../../containers/music_player_container.js'
import SpinnerContainer from '../../containers/spinner_container.js'

import * as playerActions from '../../actions/playerActions'

class ApplicationComponent extends Component {
  constructor(props) {
    super(props);

    this.resizeAppWindow(props.app.playerContent)
  }

  componentDidMount() {
    this.updateOnlineStatus()
    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline',  this.updateOnlineStatus);

    ipcRenderer.on('start-track-downloading', this.handleStartTrackDownloading);
    ipcRenderer.on('finish-track-downloading', this.handleFinishTrackDownloading);
  }

  componentWillUnmount() {
    window.removeEventListener('online',  this.updateOnlineStatus);
    window.removeEventListener('offline',  this.updateOnlineStatus);

    ipcRenderer.removeListener('start-track-downloading', this.handleStartTrackDownloading);
    ipcRenderer.removeListener('finish-track-downloading', this.handleFinishTrackDownloading);
  }

  handleStartTrackDownloading = () => {
    this.props.actions.startTrackDownloading()
  }

  handleFinishTrackDownloading = () => {
    this.props.actions.finishTrackDownloading()
  }

  componentDidUpdate = (prevProps) => {
    const app = this.props.app;
    const prevApp = prevProps.app;

    const player = this.props.player;
    const prevPlayer = prevProps.player;

    this.updateTrayImageIfNeeded(player.isPlaying, prevPlayer.isPlaying);
    this.resizeIfNeeded(app.playerContent, prevApp.prevPlayerContent);
  }

  updateTrayImageIfNeeded = (isPlaying, prevIsPlaying) => {
    // Turn player OFF
    if (prevIsPlaying && !isPlaying) {
      ipcRenderer.send('update-image-tray-window-event', false);
    }
    // Turn player ON
    if (!prevIsPlaying && isPlaying) {
      ipcRenderer.send('update-image-tray-window-event', true);
    }
  }


  resizeIfNeeded = (playerContent, prevPlayerContent) => {
    if ( playerContent != prevPlayerContent ) {
      this.resizeAppWindow(playerContent);
    }
  }

  resizeAppWindow = (boolean) => {
    let height;

    if ( boolean ) {
      height = 325
    } else {
      height = 92
    }
    remote.getCurrentWindow().setSize(800, height);
  }

  updateOnlineStatus = () => {
    this.props.actions.handleOnline(navigator.onLine)
  }

  render() {
    return (
      <div className='window'>
        <div className={ classNames('window-container', 'arrow', { 'hidden': !this.props.app.playerContent }) }>
          <SpinnerContainer />
          <MusicPlayerContainer />

          <div className='window-content'>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
};


function mapStateToProps(store) {
  return {
    app: store.app,
    player: store.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(playerActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationComponent)
