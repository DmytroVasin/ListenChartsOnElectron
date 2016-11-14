const electronStorage = require('electron-json-config');

export const loadState = ()  => {
  return electronStorage.get('stateOfStore');
}

export const saveState = (state) => {
  electronStorage.set('stateOfStore', {
    app: state.app,
    player: state.player
  });
}
