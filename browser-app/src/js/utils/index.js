import { CLIENT_ID } from '../constants/config.js';

// TODO: Реально ли рекваирить файлы таким образом, что бы типо оно их рекваирило относительно ROOT_FOLDER или предустановленной папки
// Проблема в том, что при билде приложения папки будут копироваться без соблюдения структуры
const dummyImage = require('../../styles/images/player/dummy-image.jpg');

/**
 * Convert null, 0, 240 value minutes to
 * hours in format 3.5h
 * @return {String}
 */
export function minutesToHour(minutes) {
  if (minutes == 0) return null

  let _hours, _nearestHalfHour

  _hours = (minutes / 60).toFixed(2)
  _nearestHalfHour = Math.round(_hours*2)/2

  return _nearestHalfHour + 'h'
}

/**
 * Convert null, 0, 240 value minutes to
 * hours in format 08:10
 * @return {String}
 */
export function convertMinutesToTrayFromat(minutes) {
  if (minutes == null) return ''

  let numOfSec = parseInt(minutes, 10)

  let h = Math.floor(numOfSec / 3600);
  let m = Math.floor((numOfSec - (h * 3600)) / 60);

  if (h < 10) { h = "0"+h }
  if (m < 10) { m = "0"+m }

  return h+':'+m;
}


// Format for seconds -> "00:00"
export function formatSeconds(num) {
  const minutes = padZero(Math.floor(num / 60), 2);
  const seconds = padZero(num % 60, 2);
  return `${minutes}:${seconds}`;
}

function padZero(num, size) {
  let s = String(num);
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
}

// Return offset of left.
// Note: only for webkit
export function offsetLeft(element) {
  let leftOffset = element.getBoundingClientRect().left
  return Math.round(leftOffset);
}


export function soundCloudUrl(scid) {
  if (scid) {
    return `https://api.soundcloud.com/tracks/${scid}/stream?client_id=${CLIENT_ID}`;
  } else {
    return '';
  }
}

export function soundCloudImage(imageUrl) {
  if (imageUrl) {
    return imageUrl;
  } else {
    return dummyImage;
  }
}

export function random(n) {
  return Math.floor(Math.random() * n);
}
