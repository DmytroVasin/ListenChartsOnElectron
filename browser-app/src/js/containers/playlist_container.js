import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as playerActions from '../actions/playerActions'

import { PlaylistPage } from '../components/playlist/playlist_page.jsx';

function mapStateToProps(store) {
  return {
    playlist: store.playlist,
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
)(PlaylistPage)
