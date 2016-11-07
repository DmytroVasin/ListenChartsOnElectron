const initialState = {
  player: {
    song: {},
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    replay: false,
    shuffle: false
  },

  playList: {
    songs: [],
    error: null,
    loading: false
  },

  stationsList: {
    stations: [],
    error: null,
    loading: false
  },
}

const reducer = function(state=initialState, action) {
  switch(action.type) {

    case 'FETCH_LIST_REQUEST':
      return { ...state, playList: {songs: [], error: null, loading: true }}
    case 'FETCH_LIST_SUCCESS':
      return { ...state, playList: {songs: action.payload, error: null, loading: false }}
    case 'FETCH_LIST_FAILURE':
      return { ...state, playList: {songs: [], error: action.payload, loading: false }}




    case 'FETCH_STATIONS_REQUEST':
      return { ...state, stationsList: {stations: [], error: null, loading: true }}
    case 'FETCH_STATIONS_SUCCESS':
      return { ...state, stationsList: {stations: action.payload, error: null, loading: false }}
    case 'FETCH_STATIONS_FAILURE':
      return { ...state, stationsList: {stations: [], error: action.payload, loading: false }}




    case 'TOGGLE_PLAY':
      return { ...state, player: { isPlaying: action.payload, currentTime: state.player.currentTime, duration: state.player.duration, song: state.player.song, replay: state.player.replay, shuffle: state.player.shuffle } }

    case 'TOGGLE_REPLAY':
      return { ...state, player: { isPlaying: action.payload, currentTime: state.player.currentTime, duration: state.player.duration, song: state.player.song, replay: !state.player.replay, shuffle: state.player.shuffle } }

    case 'TOGGLE_SHUFFLE':
      return { ...state, player: { isPlaying: action.payload, currentTime: state.player.currentTime, duration: state.player.duration, song: state.player.song, replay: state.player.replay, shuffle: !state.player.shuffle } }

    case 'FETCH_SONG_REQUEST':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentTime: 0, duration: 0, song: action.payload, replay: state.player.replay, shuffle: state.player.shuffle } }

    case 'FETCH_SONG_SUCCESS':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentTime: state.player.currentTime, duration: state.player.duration, song: Object.assign({}, state.player.song, { scid: action.payload }), replay: state.player.replay, shuffle: state.player.shuffle } }

    case 'PLAYER_DURATION_UPDATE':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentTime: state.player.currentTime, duration: action.payload, song: state.player.song, replay: state.player.replay, shuffle: state.player.shuffle } }

    case 'PLAYER_TIME_UPDATE':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentTime: action.payload, duration: state.player.duration, song: state.player.song, replay: state.player.replay, shuffle: state.player.shuffle } }

    case 'CHANGE_PLAYING_SONG':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentTime: state.player.currentTime, duration: state.player.duration, song: state.player.song, replay: state.player.replay, shuffle: state.player.shuffle } }

    default:
      return state
  }
}

export default reducer
