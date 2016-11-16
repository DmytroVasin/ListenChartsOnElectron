const electronStorage = require('electron-json-config');

export const loadState = ()  => {
  return electronStorage.get('stateOfStore');
}

export const saveState = (state) => {
  electronStorage.set('stateOfStore', {
    app: Object.assign({}, state.app, { downloadLoading: false, is_online: false }),
    player: Object.assign({}, state.player, { isPlaying: false })
  });
}
