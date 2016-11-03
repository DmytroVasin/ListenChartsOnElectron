import React, { Component } from 'react'

import { RadioStation } from './radio_station.jsx'

export class RadioStationPage extends Component {

  componentWillMount() {
    this.props.actions.fetchStations()
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
