const INITIAL_STATE = {
  downloadLoading: false,
  playerContent: true
}

const playlist = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'START_TRACK_DOWNLOADING':
      return Object.assign({}, state, { downloadLoading: true });

    case 'FINISH_TRACK_DOWNLOADING':
      return Object.assign({}, state, { downloadLoading: false });

    case 'OPEN_PLAYER_CONTENT':
      return Object.assign({}, state, { playerContent: true });

    case 'TOGGLE_PLAYER_CONTENT':
      return Object.assign({}, state, { playerContent: !state.playerContent });

    default:
      return state
  }
}

export default playlist
