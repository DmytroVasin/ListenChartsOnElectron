const path = require('path');
const { Tray } = require('electron');

class TrayIcon {
  constructor(trayWindow) {
    let electronScreen = require('electron').screen

    let iconPath = path.join(__dirname, '../icons/icon-22.png')

    // TODO: Refactoring.
    this.icon_default = path.join(__dirname, '../icons/icon-22.png')
    this.icon_0 = path.join(__dirname, '../icons/0.png')
    this.icon_1 = path.join(__dirname, '../icons/1.png')
    this.icon_2 = path.join(__dirname, '../icons/2.png')
    this.icon_3 = path.join(__dirname, '../icons/3.png')
    this.icon_4 = path.join(__dirname, '../icons/4.png')
    this.icon_5 = path.join(__dirname, '../icons/5.png')
    this.icon_6 = path.join(__dirname, '../icons/6.png')

    this.trayIcon = new Tray(iconPath);

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

  // TODO: Refactoring.
  updateTrayImage(boolStatus) {
    if (boolStatus) {
      this.setRandomImage()
      this.trayTimeout = setTimeout( () => { this.updateTrayImage(true) }, 500);
    } else {
      this.setDefaultImage()
      clearTimeout(this.trayTimeout);
    }
  }

  setRandomImage() {
    let iconName = 'icon_' + Math.floor(Math.random() * 7);
    this.trayIcon.setImage(this[iconName]);
  }

  setDefaultImage() {
    this.trayIcon.setImage(this.icon_default);
  }
}

module.exports = TrayIcon;
