import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Application from './components/layout/application.jsx'

import MainPageContainer     from './containers/main_page_container.js'

export default (
  <Route   path='/'                 component={Application} >
    <IndexRoute                     component={MainPageContainer} />
  </Route>
)
