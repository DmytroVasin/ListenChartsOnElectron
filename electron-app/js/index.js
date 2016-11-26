const isDev = (process.env.NODE_ENV === 'development');

let installExtension = null;
if ( isDev ) {
  installExtension = require('electron-devtools-installer');
}

const electron = require('electron');
const {app, ipcMain, Menu, shell} = electron;

const platform = require('os').platform();
const menuTemplate = require('./menuTemplate');
const MainWindow  = require('../windows/main_window');
const TrayIcon = require('./TrayIcon');

const GithubUpdater = require('./github_updater');
const downloadFile = require('./download_file');

let mainWindow = null;
let trayIcon = null;

let ghUpdater = new GithubUpdater({
  githubName: 'DmytroVasin',
  githubProject: 'ListenChartsOnElectron',
  currentVersion: app.getVersion()
});

if ( !isDev ) {
  // Dock works only on Mac
  if (app.dock) {
    app.dock.hide();
  }
}

app.on('ready', function () {
  if ( isDev ) installExtentions();

  mainWindow = new MainWindow();
  Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate(mainWindow)) );

  trayIcon = new TrayIcon(mainWindow);

  mainWindow.window.once('show', () => {
    ghUpdater.checkVersion(mainWindow.window);
  })
});

ipcMain.on('quit-app', function() {
  mainWindow.window.close();
  app.quit();
});

// Custom events MAIN WINDOW
ipcMain.on('update-image-tray-window-event', function(event, state) {
  trayIcon.updateTrayImage(state);
});

ipcMain.on('dowload-file-from-url', function(event, url, artist, title) {
  downloadFile(mainWindow.window, url, artist, title)
});

ipcMain.on('resize-app-window', function(event, state) {
  mainWindow.setWindowSize(state);

  if (platform == 'win32') {
    mainWindow.setWindowPosition(trayIcon.tray.getBounds());
  }
});

const installExtentions = function () {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}
