const INITIAL_STATE = {
  downloadLoading: false,
  playerContent: true,
  currentStationId: null,
  is_online: false
}

const playlist = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'IS_ONLINE':
      return Object.assign({}, state, { is_online: action.payload });

    case 'START_TRACK_DOWNLOADING':
      return Object.assign({}, state, { downloadLoading: true });

    case 'FINISH_TRACK_DOWNLOADING':
      return Object.assign({}, state, { downloadLoading: false });

    case 'OPEN_PLAYER_CONTENT':
      return Object.assign({}, state, { playerContent: true });

    case 'TOGGLE_PLAYER_CONTENT':
      return Object.assign({}, state, { playerContent: !state.playerContent });

    case 'UPDATE_CURRENT_STATION_ID':
      return Object.assign({}, state, { currentStationId: action.payload });

    default:
      return state
  }
}

export default playlist
