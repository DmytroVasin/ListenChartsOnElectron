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

  componentDidUpdate = (prevProps) => {
    const playerContent = this.props.app.playerContent;
    const prevPlayerContent = prevProps.app.playerContent;

    if ( playerContent != prevPlayerContent ) {
      this.resizeAppWindow(playerContent)
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
    stations_list: store.stations_list,
    playlist: store.playlist,
    player: store.player,
    app: store.app
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
