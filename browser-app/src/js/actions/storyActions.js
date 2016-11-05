import axios from 'axios'

export function fetchList(stationId) {
  return (dispatch) => {
    dispatch(fetchListRequest())
    axios.get(`http://beta.listencharts.com/api/v1/charts/${stationId}`)
    .then(function(response) {
      dispatch(fetchListSuccess(response.data))
    })
    .catch(function (error) {
      dispatch(fetchListFailure(error.message))
    })
  }
}
function fetchListRequest() {
  return {
    type: 'FETCH_LIST_REQUEST'
  }
}
function fetchListSuccess(list) {
  return {
    type: 'FETCH_LIST_SUCCESS',
    payload: list.songs
  }
}
function fetchListFailure(error) {
  return {
    type: 'FETCH_LIST_FAILURE',
    payload: error
  }
}


export function fetchStations() {
  return (dispatch) => {
    dispatch(fetchStationsRequest())
    axios.get('http://beta.listencharts.com/api/v1/charts')
    .then(function(response) {
      dispatch(fetchStationsSuccess(response.data))
    })
    .catch(function (error) {
      dispatch(fetchStationsFailure(error.message))
    })
  }
}
function fetchStationsRequest() {
  return {
    type: 'FETCH_STATIONS_REQUEST'
  }
}
function fetchStationsSuccess(list) {
  return {
    type: 'FETCH_STATIONS_SUCCESS',
    payload: list.charts
  }
}
function fetchStationsFailure(error) {
  return {
    type: 'FETCH_STATIONS_FAILURE',
    payload: error
  }
}


export function toggleIsPlaying(isPlaying) {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_PLAY',
      payload: isPlaying
    })
  }
}



export function fetchSong(id, query) {
  return (dispatch) => {
    dispatch(fetchSongRequest(id))
    SC.get('/tracks', { q: encodeURI(query) }).then( function(data) {
      dispatch(fetchSongSuccess(data[0]))
    }).catch(function (error) {
      console.log('There was an error ' + error.message);
    });

    // axios.get('https://api.soundcloud.com/tracks?limit=10&offset=0&client_id='+CLIENT_ID+'&q='+encodeURI(query))
    // .then(function(response) {
    //   dispatch(fetchSongSuccess(response.data[0]))
    // })
    // .catch(function (error) {
    //   console.log('failed')
    // })
  }
}
function fetchSongRequest(id) {
  return {
    type: 'FETCH_SONG_REQUEST',
    payload: { id: id }
  }
}
function fetchSongSuccess(scSong) {
  return {
    type: 'FETCH_SONG_SUCCESS',
    payload: { scid: scSong.id }
  }
}
// function fetchSongFailure(error) {
//   return {
//     type: 'FETCH_SONG_FAILURE',
//     payload: error
//   }
// }


export function durationUpdate(duration) {
  return (dispatch) => {
    dispatch({
      type: 'PLAYER_DURATION_UPDATE',
      payload: duration
    })
  }
}

export function timeUpdate(currentTime) {
  return (dispatch) => {
    dispatch({
      type: 'PLAYER_TIME_UPDATE',
      payload: currentTime
    })
  }
}
