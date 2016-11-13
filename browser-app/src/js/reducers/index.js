import { combineReducers } from 'redux'

import stations_list from './stations_list'
import playlist from './playlist'
import player from './player'
import app from './app'

const rootReducer = combineReducers({
  stations_list,
  playlist,
  player,
  app
})

export default rootReducer
