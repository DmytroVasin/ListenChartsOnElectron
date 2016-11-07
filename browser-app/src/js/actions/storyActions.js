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

export function toggleReplay() {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_REPLAY'
    })
  }
}

export function toggleShuffle() {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_SHUFFLE'
    })
  }
}


// TODO: хня какая-то смена песни идет только после запроса...
// Это если делать так как в Charts...
export function fetchSong(song) {
  return (dispatch) => {
    dispatch(fetchSongRequest(song))
    let query = song.artist + ' ' + song.title;
    SC.get('/tracks', { q: encodeURI(query) }).then( function(data) {
      dispatch(fetchSongSuccess(data[0]))
    }).catch(function (error) {
      console.log('There was an error ' + error.message);
    });
  }
}
function fetchSongRequest(song) {
  return {
    type: 'FETCH_SONG_REQUEST',
    payload: song
  }
}
function fetchSongSuccess(scSong) {
  return {
    type: 'FETCH_SONG_SUCCESS',
    payload: scSong.id
  }
}


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


// TODO: Это нихуя не Action. это вроде как LIB или что-то вроде.
export function changeSong(changeType) {
  return (dispatch, getState) => {
    const state = getState();
    const { player, playList } = state.reducer;
    let newSongPlace;

    console.log('----------------------------')
    console.log(state)
    console.log('----------------------------')

    if (changeType === 'NEXT_SONG') {
      newSongPlace = player.song.place + 1;
    } else if (changeType === 'PREV_SONG') {
      newSongPlace = player.song.place - 1;
    }

    if (newSongPlace <= 0 || newSongPlace >= playList.songs.length ) {
      return null;
    }

    let newSong = playList.songs.find((song) => song.place === newSongPlace);

    return dispatch(fetchSong(newSong));
  }
}
