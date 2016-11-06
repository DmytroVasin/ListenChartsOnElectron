const initialState = {
  player: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentSongID: null,
    currentSongSCID: null,
    title: '',
    artist: '',
    place: null
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


    // return Object.assign({}, state, { playing: false });
    case 'TOGGLE_PLAY':
      return { ...state, player: { isPlaying: action.payload, currentSongSCID: state.player.currentSongSCID, currentSongID: state.player.currentSongID, currentTime: state.player.currentTime, duration: state.player.duration, title: state.player.title, artist: state.player.artist, place: state.player.place } }

    case 'FETCH_SONG_REQUEST':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentSongSCID: state.player.currentSongSCID, currentSongID: action.payload.id, currentTime: 0, duration: 0, title: state.player.title, artist: state.player.artist, place: state.player.place } }

    case 'FETCH_SONG_SUCCESS':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentSongSCID: action.payload.scid, currentSongID: state.player.currentSongID, currentTime: state.player.currentTime, duration: state.player.duration, title: state.player.title, artist: state.player.artist, place: state.player.place } }

    case 'PLAYER_DURATION_UPDATE':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentSongSCID: state.player.currentSongSCID, currentSongID: state.player.currentSongID, currentTime: state.player.currentTime, duration: action.payload, title: state.player.title, artist: state.player.artist, place: state.player.place } }

    case 'PLAYER_TIME_UPDATE':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentSongSCID: state.player.currentSongSCID, currentSongID: state.player.currentSongID, currentTime: action.payload, duration: state.player.duration, title: state.player.title, artist: state.player.artist, place: state.player.place } }

    case 'PLAYER_TITLE_UPDATE':
      return { ...state, player: { isPlaying: state.player.isPlaying, currentSongSCID: state.player.currentSongSCID, currentSongID: state.player.currentSongID, currentTime: state.player.currentTime, duration: state.player.duration, title: action.payload.title, artist: action.payload.artist, place: action.payload.place } }


    default:
      return state
  }
}

export default reducer
