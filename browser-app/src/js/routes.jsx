import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Application from './components/layout/application.jsx'

import RadioStationContainer from './containers/radio_station_container.js'
import PlaylistContainer     from './containers/playlist_container.js'

export default (
  <Route path='/'                   component={ Application } >
    <IndexRoute                     component={ RadioStationContainer } />
    <Route path="/radiostation/:id" component={ PlaylistContainer } />
  </Route>
)
