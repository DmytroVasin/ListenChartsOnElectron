import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as storyActions from '../actions/storyActions'

import { MainPage } from '../components/graphs/main_page.jsx';

function mapStateToProps(store) {
  return {
    playList: store.reducer.playList,
    playing: store.reducer.playing
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
)(MainPage)
