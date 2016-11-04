const initialState = {
  player: {
    isPlaying: false,
    currentSongSCID: null
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
      return { ...state, player: { isPlaying: action.payload, currentSongSCID: state.player.currentSongSCID } }


    case 'FETCH_SONG_REQUEST':
      return state
      // return { ...state, player: { isPlaying: action.payload } }
    case 'FETCH_SONG_SUCCESS':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentSongSCID: action.payload.scid } }


    default:
      return state
  }
}

export default reducer
