import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as playerActions from '../actions/playerActions'

import { RadioStationPage } from '../components/radio_station/radio_station_page.jsx';

function mapStateToProps(store) {
  return {
    stationsList: store.stations_list
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
)(RadioStationPage)
