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
    console.log('REQUEST')
    SC.get('/tracks', { q: encodeURI(query) }).then( function(data) {
      console.log('SUCCESS')
      dispatch(fetchSongSuccess(data[0]))
    }).catch(function (error) {
      console.log('There was an error ' + error.message);
    });
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

export function setPlayerTitle(songMetaData) {
  return (dispatch) => {
    dispatch({
      type: 'PLAYER_TITLE_UPDATE',
      payload: { title: songMetaData.title, artist: songMetaData.artist, place: songMetaData.place }
    })
  }
}


export function changeSong(changeType) {
  return (dispatch, getState) => {
    const state = getState();
    const { player, playList } = state.reducer;
    let newSongIndex;

    if (changeType === 'NEXT_SONG') {
      newSongIndex = player.place + 1;
    }

    if (newSongIndex < 0 || newSongIndex >= playList.songs.length ) {
      return null;
    }

    let newSong = playList.songs[newSongIndex]
    console.log('.........')
    // ??????????????????????????????
    fetchSong(newSong.id, newSong.artist + ' ' + newSong.title)
  }
}
