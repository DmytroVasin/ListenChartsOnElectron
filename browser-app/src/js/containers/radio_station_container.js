import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as storyActions from '../actions/storyActions'

import { RadioStationPage } from '../components/radio_station/radio_station_page.jsx';

function mapStateToProps(store) {
  return {
    stationsList: store.stations_list
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
)(RadioStationPage)
