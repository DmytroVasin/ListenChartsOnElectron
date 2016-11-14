const INITIAL_STATE = {
  song: {},
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  replay: false,
  shuffle: false,
  volume: 0.8,
  mute: false
}

const player = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'PLAY_SONG':
      return Object.assign({}, state, { song: action.payload, currentTime: 0, duration: 0 });

    case 'TOGGLE_PLAY':
      return Object.assign({}, state, { isPlaying: action.payload });

    case 'TOGGLE_REPLAY':
      return Object.assign({}, state, { replay: !state.replay, shuffle: false });

    case 'TOGGLE_SHUFFLE':
      return Object.assign({}, state, { shuffle: !state.shuffle, replay: false });

    case 'TOGGLE_MUTE':
      return Object.assign({}, state, { mute: !state.mute });

    case 'PLAYER_DURATION_UPDATE':
      return Object.assign({}, state, { duration: action.payload });

    case 'PLAYER_TIME_UPDATE':
      return Object.assign({}, state, { currentTime: action.payload });

    case 'PLAYER_VOLUME_UPDATE':
      return Object.assign({}, state, { volume: action.payload, mute: false });

    default:
      return state
  }
}

export default player
