const INITIAL_STATE = {
  songs: [],
  error: null,
  loading: false
}

const playlist = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'FETCH_LIST_REQUEST':
      return Object.assign({}, state, { loading: true });

    case 'FETCH_LIST_SUCCESS':
      return Object.assign({}, state, { songs: action.payload, loading: false });

    case 'FETCH_LIST_FAILURE':
      return Object.assign({}, state, { error: action.payload, loading: false });

    case 'UPDATE_PLAYLIST_SONG':
      return Object.assign({}, state, { songs: state.songs.map(song => song.id === action.payload.id ? action.payload : song) });

    default:
      return state
  }
}

export default playlist
