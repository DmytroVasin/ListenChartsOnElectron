import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as storyActions from '../actions/storyActions'

import { MusicPlayer } from '../components/player/music_player.jsx';

function mapStateToProps(store) {
  return {
    player: store.reducer.player,
    song: store.reducer.player.song
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storyActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPlayer)
