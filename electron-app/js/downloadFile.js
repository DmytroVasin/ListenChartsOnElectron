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
      { name: 'Audio', extensions: ['mp3'] },
    ]
  }, function(filePath) {
    if (filePath) {

      session.defaultSession.on('will-download', function(event, item, webContents) {
        item.setSavePath(filePath)

        item.once('done', function(event, state) {
          mainWindow.webContents.send('finish-track-downloading');

          if (state === 'completed') {
            var fileName = item.getSavePath().replace(/^.*[\\\/]/, '');
            var message = 'File was download successfully';

            sendNotification(mainWindow, fileName, message);
          }
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

const sendNotification = function (mainWindow, fileName, message) {
  mainWindow.webContents.send('display-notification', {
    title: fileName,
    options: { body: message }
  })
}

module.exports = downloadFile;
