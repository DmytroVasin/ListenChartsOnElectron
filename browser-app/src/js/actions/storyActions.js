import axios from 'axios'
import { random } from '../utils';

export function fetchList(stationId) {
  return (dispatch) => {
    dispatch(fetchListRequest())
    axios.get(`https://winamp-api.herokuapp.com/api/v1/stations/${stationId}/episodes`)
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
function fetchListSuccess(songs) {
  return {
    type: 'FETCH_LIST_SUCCESS',
    payload: songs
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
    axios.get('https://winamp-api.herokuapp.com/api/v1/stations')
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
function fetchStationsSuccess(stations) {
  return {
    type: 'FETCH_STATIONS_SUCCESS',
    payload: stations
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

export function playSong(song) {
  return (dispatch) => {
    dispatch({
      type: 'PLAY_SONG',
      payload: song
    })
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

export function toggleMute() {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_MUTE'
    })
  }
}


// TODO: Это нихуя не Action. это вроде как LIB или что-то вроде.
export function changeSong(changeType) {
  return (dispatch, getState) => {
    const state = getState();
    const { player, playlist } = state;
    let newSongPlace;

    if (changeType === 'NEXT_SONG') {
      newSongPlace = player.song.place + 1;
    } else if (changeType === 'PREV_SONG') {
      newSongPlace = player.song.place - 1;
    } else if (changeType === 'REPLAY_SONG') {
      newSongPlace = player.song.place
    } else if (changeType === 'SHUFFLE_SONG') {
      newSongPlace = random(playlist.songs.length + 1);
    }

    if (newSongPlace <= 0 || newSongPlace >= playlist.songs.length ) {
      return null;
    }

    let newSong = playlist.songs.find((song) => song.place === newSongPlace);

    return dispatch(playSong(newSong));
  }
}


export function updatePlaylistSong(song) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_PLAYLIST_SONG',
      payload: song
    })
  }
}

export function volumeUpdate(volume) {
  return (dispatch) => {
    dispatch({
      type: 'PLAYER_VOLUME_UPDATE',
      payload: volume
    })
  }
}


export function togglePlayerContent() {
  return (dispatch) => {
    dispatch({
      type: 'PLAYER_CONTENT_TOGGLE'
    })
  }
}
