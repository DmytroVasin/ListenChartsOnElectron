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

const downloadFile = require('./downloadFile');

const {app, ipcMain, Menu} = electron;

let main = null;
let trayIcon = null;

if ( !isDev ) {
  app.dock.hide();
}

app.on('ready', function () {
  if ( isDev ) installExtentions();

  main = new MainWindow();
  Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate(main)) );

  trayIcon = new TrayIcon(main.window);
});


// autoUpdater.addListener('checking-for-update', function (event) {
//   console.log(app.getVersion())
//   console.log('checking-for-update')
// });


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
