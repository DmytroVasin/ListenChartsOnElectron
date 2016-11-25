// curl -i https://api.github.com/repos/DmytroVasin/ListenChartsOnElectron/releases/latest
// const autoUpdater = require('electron-auto-updater')['autoUpdater']


const isDev = (process.env.NODE_ENV === 'development');

let installExtension = null;
if ( isDev ) {
  installExtension = require('electron-devtools-installer');
}

const electron = require('electron');
const menuTemplate = require('./menuTemplate');
const MainWindow  = require('../windows/main_window');
const TrayIcon = require('./TrayIcon');

const GithubUpdater = require('./github_updater');
const downloadFile = require('./download_file');

const {app, ipcMain, Menu} = electron;

let main = null;
let trayIcon = null;

let ghUpdater = new GithubUpdater({
  githubName: 'DmytroVasin',
  githubProject: 'ListenChartsOnElectron',
  currentVersion: app.getVersion()
});

if ( !isDev ) {
  app.dock.hide();
}

app.on('ready', function () {
  if ( isDev ) installExtentions();

  main = new MainWindow();
  Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate(main)) );

  trayIcon = new TrayIcon(main.window);


  // ghUpdater.checkVersion();
});

ipcMain.on('quit-app', function() {
  main.window.close();
  app.quit();
});

// Custom events MAIN WINDOW
ipcMain.on('update-image-tray-window-event', function(event, state) {
  trayIcon.updateTrayImage(state);
});

ipcMain.on('dowload-file-from-url', function(event, url, artist, title) {
  downloadFile(main.window, url, artist, title)
});

const installExtentions = function () {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}
