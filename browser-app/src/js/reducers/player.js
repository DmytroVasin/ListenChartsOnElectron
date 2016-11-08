const INITIAL_STATE = {
  song: {},
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  replay: 0,
  shuffle: 0,
  volume: 0.8
}

const player = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'TOGGLE_PLAY':
      return Object.assign({}, state, { isPlaying: action.payload });

    case 'TOGGLE_REPLAY':
      return Object.assign({}, state, { replay: !state.replay });

    case 'TOGGLE_SHUFFLE':
      return Object.assign({}, state, { shuffle: !state.shuffle });

    case 'FETCH_SONG_REQUEST':
      return Object.assign({}, state, { song: action.payload, currentTime: 0, duration: 0 });

    case 'FETCH_SONG_SUCCESS':
      return Object.assign({}, state, { song: Object.assign({}, state.song, { scid: action.payload }) });

    case 'PLAYER_DURATION_UPDATE':
      return Object.assign({}, state, { duration: action.payload });

    case 'PLAYER_TIME_UPDATE':
      return Object.assign({}, state, { currentTime: action.payload });

    case 'PLAYER_VOLUME_UPDATE':
      return Object.assign({}, state, { volume: action.payload });

    default:
      return state
  }
}

export default player
