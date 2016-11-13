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

  main.window.webContents.session.on('will-download', function(event, item, webContents) {
    item.once('done', function(event, state) {
      var fileName = item.getSavePath().replace(/^.*[\\\/]/, '');
      var message;

      if (state === 'completed') {
        message = 'File was download successfully';
      } else {
        message = 'Download failed!';
      }

      sendNotification(fileName, message);
    });
  });
});

ipcMain.on('quit-app', function() {
  main.window.close();
  app.quit();
});

// Custom events MAIN WINDOW
ipcMain.on('update-image-tray-window-event', function(event, state) {
  trayIcon.updateTrayImage(state);
});

ipcMain.on('dowload-file-from-url', function(event, url) {
  main.window.webContents.downloadURL(url);
});


const sendNotification = function (title, message) {
  main.window.webContents.send('display-notification', {
    title: title,
    options: { body: message }
  })
}


const installExtentions = function () {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}
