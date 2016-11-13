const INITIAL_STATE = {
  downloadLoading: false
}

const playlist = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'START_TRACK_DOWNLOADING':
      return Object.assign({}, state, { downloadLoading: true });

    case 'FINISH_TRACK_DOWNLOADING':
      return Object.assign({}, state, { downloadLoading: false });

    default:
      return state
  }
}

export default playlist
