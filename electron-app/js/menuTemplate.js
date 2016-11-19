const electron = require('electron');

const {app} = electron;

let menuTemplate = function(mainWindow) {
  return [
    {
      label: 'Application',
      submenu: [
        {
          label: 'Quit', accelerator: 'Command+Q',
          click: function () {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Developer Tools', accelerator: 'F12',
          click: function (item, focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        },
        {
          label: 'Reload', accelerator: 'CmdOrCtrl+R',
          click: function (item, focusedWindow) {
            focusedWindow.reload();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      ]
    }
  ]
}

module.exports = menuTemplate
