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

// app.dock.hide();

// app.commandLine.appendSwitch('enable-transparent-visuals');
app.on('ready', function () {
  if ( isDev ) installExtentions();

  main = new MainWindow();
  Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate(main)) );

  new TrayIcon(main.window);
})


ipcMain.on('quit-app', function() {
  main.window.close();
  app.quit();
});

// Custom events MAIN WINDOW
ipcMain.on('show-main-window-event', function() {
  main.window.show();
  app.dock.show();
});

const installExtentions = function () {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}
