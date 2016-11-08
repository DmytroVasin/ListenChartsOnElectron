import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as storyActions from '../actions/storyActions'

import { PlaylistPage } from '../components/playlist/playlist_page.jsx';

function mapStateToProps(store) {
  return {
    playlist: store.playlist,
    player: store.player
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
)(PlaylistPage)
