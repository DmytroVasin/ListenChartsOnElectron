import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as playerActions from '../actions/playerActions'

import { MusicPlayer } from '../components/player/music_player.jsx';

function mapStateToProps(store) {
  return {
    app: store.app,
    player: store.player,
    song: store.player.song,
    playlist: store.playlist
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
)(MusicPlayer)
