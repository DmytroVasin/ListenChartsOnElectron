const INITIAL_STATE = {
  stations: [],
  error: null,
  loading: false
}

const stationsList = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case 'FETCH_STATIONS_REQUEST':
      return Object.assign({}, state, { loading: true });

    case 'FETCH_STATIONS_SUCCESS':
      return Object.assign({}, state, { stations: action.payload, loading: false });

    case 'FETCH_STATIONS_FAILURE':
      return Object.assign({}, state, { error: action.payload, loading: false });

    default:
      return state
  }
}

export default stationsList
