import { combineReducers } from 'redux'

import stations_list from './stations_list'
import playlist from './playlist'
import player from './player'

const rootReducer = combineReducers({
  stations_list,
  playlist,
  player
})

export default rootReducer
