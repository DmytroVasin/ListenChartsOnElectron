const isDev = (process.env.NODE_ENV === 'development');

let installExtension = null;
if ( isDev ) {
  installExtension = require('electron-devtools-installer');
}

const electron = require('electron');
const menuTemplate = require('./menuTemplate');

const MainWindow  = require('../windows/main_window');

const TrayIcon = require('./TrayIcon');

const {app, ipcMain, Menu} = electron;

let main = null;
let trayIcon = null;

// app.dock.hide();

app.on('ready', function () {
  if ( isDev ) installExtentions();

  main = new MainWindow();
  Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate(main)) );

  trayIcon = new TrayIcon(main.window);
})

ipcMain.on('quit-app', function() {
  main.window.close();
  app.quit();
});

// Custom events MAIN WINDOW
ipcMain.on('update-image-tray-window-event', function(event, status) {
  trayIcon.updateTrayImage(status);
});

const installExtentions = function () {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}
