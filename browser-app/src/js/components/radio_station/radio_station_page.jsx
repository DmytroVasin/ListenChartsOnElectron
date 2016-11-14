import React, { Component } from 'react'

import { RadioStation } from './radio_station.jsx'

export class RadioStationPage extends Component {

  componentWillMount() {
    this.props.actions.fetchStations()
  }

  componentDidUpdate() {
    const { app, stationsList } = this.props

    if ( stationsList.stations[0] && !app.currentStationId ) {
      this.props.actions.updateCurrentStationId(stationsList.stations[0].id)
    }
  }

  render() {
    const { stations, error, loading } = this.props.stationsList

    if (loading || !stations.length) {
      return null
    }

    if (error) {
      return <div>Error: {error}</div>
    }

    let radioStations = stations.map( (station) => {
      return <RadioStation key={station.id} station={station}/>
    })

    return (
      <div id='lc-radio-stations'>
        { radioStations }
      </div>
    )
  }
}
