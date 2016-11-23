const electron = require('electron');
const path = require('path');

const { app, dialog, session } = electron;

let downloadFile = function(mainWindow, url, artist, title) {
  let targetPath = app.getPath('downloads');
  let fileName = fileNameConcat(artist, title);

  mainWindow.webContents.send('start-track-downloading');

  dialog.showSaveDialog({
    defaultPath: path.join(targetPath, fileName),
    filters: [
      { name: 'Audio', extensions: ['mp3'] }
    ]
  }, function(filePath) {
    if (filePath) {

      session.defaultSession.on('will-download', function(event, item, webContents) {
        item.setSavePath(filePath)

        item.once('done', function(event, state) {
          mainWindow.webContents.send('finish-track-downloading');
          let title;
          let message;
          if (state === 'interrupted') {
            title = 'Something went wrong. Sorry.';
            message = '';
          }

          if (state === 'completed') {
            title = item.getSavePath().replace(/^.*[\\\/]/, '');
            message = 'File was download successfully';
          }

          sendNotification(mainWindow, title, message);
        });
      });

      mainWindow.webContents.downloadURL(url);
    } else {
      mainWindow.webContents.send('finish-track-downloading');
    }
  })
}

const fileNameConcat = function(artist, title) {
  let fileName = artist + '_' + title;
  return fileName.replace(/ /g,'_');
}

const sendNotification = function (mainWindow, title, message) {
  mainWindow.webContents.send('display-notification', {
    title: title,
    options: { body: message }
  })
}

module.exports = downloadFile;
