const initialState = {
  playing: false,

  playList: {
    songs: [],
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

    case 'TOGGLE_PAUSE':
      return { ...state, playing: !state.playing }


    default:
      return state
  }
}

export default reducer
