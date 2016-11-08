const path = require('path');
const { Tray } = require('electron');

class TrayIcon {
  constructor(trayWindow) {
    let electronScreen = require('electron').screen

    let iconPath = path.join(__dirname, '../icons/icon-22.png')

    this.trayIcon = new Tray(iconPath);
    this.trayIcon.setToolTip('Time Tracker');

    this.trayIcon.on('click', (e, bounds) => {
      if ( trayWindow.isVisible() ) {
        trayWindow.hide();
      } else {
        // TODO: Refactor
        let windowSize = trayWindow.getSize()
        let screenSize = electronScreen.getDisplayNearestPoint( electronScreen.getCursorScreenPoint() ).workArea

        let position = {
          x: Math.floor(bounds.x + bounds.width - windowSize[0] + 100),
          y: screenSize.y
        }

        trayWindow.setPosition(position.x, position.y)
        trayWindow.show();
      }
    });
  }
}

module.exports = TrayIcon;
