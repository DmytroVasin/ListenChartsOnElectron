// TODO: Реально ли рекваирить файлы таким образом, что бы типо оно их рекваирило относительно ROOT_FOLDER или предустановленной папки
// Проблема в том, что при билде приложения папки будут копироваться без соблюдения структуры
const dummyImage = require('../../images/player/dummy-image.png');

// Format for seconds -> '00:00'
export function formatSeconds(num) {
  num = num || 0
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

// Возможно ли это сделать Background-ом ?
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
