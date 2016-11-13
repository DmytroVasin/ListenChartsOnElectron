import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as playerActions from '../actions/playerActions'

import { Spinner } from '../components/spinner/spinner.jsx';

function mapStateToProps(store) {
  return {
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
)(Spinner)
