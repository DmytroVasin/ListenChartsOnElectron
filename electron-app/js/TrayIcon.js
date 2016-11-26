const electron = require('electron');
const platform = require('os').platform();
const path = require('path');

class TrayIcon {
  constructor(mainWindow) {
    this.screen = electron.screen
    this.window = mainWindow
    this.determineTrayImages();

    this.tray = new electron.Tray(this.icon_default);

    this.tray.setToolTip('LCharts')
    this.tray.setHighlightMode('never')

    this.tray.on('click', this.toggleWindow.bind(this))
    this.tray.on('right-click', this.toggleWindow.bind(this))
    this.tray.on('double-click', this.toggleWindow.bind(this))
  }

  toggleWindow(e, bounds) {
    if ( this.window.isVisible() ) {
      this.window.hide();
    } else {
      let { x, y } = this.determineWindowPosition(bounds);
      this.window.setPosition(x, y);
      this.window.show();
    }
  }

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
    this.tray.setImage(this[iconName]);
  }

  setDefaultImage() {
    this.tray.setImage(this.icon_default);
  }

  determineTrayImages() {
    let format
    if (platform == 'darwin') {
       format = 'png'
    } else if (platform == 'win32') {
      format = 'ico'
    }

    this.icon_default = path.join(__dirname, `../icons/mac/icon-22.${format}`)
    this.icon_0 = path.join(__dirname, `../icons/mac/0.${format}`)
    this.icon_1 = path.join(__dirname, `../icons/mac/1.${format}`)
    this.icon_2 = path.join(__dirname, `../icons/mac/2.${format}`)
    this.icon_3 = path.join(__dirname, `../icons/mac/3.${format}`)
    this.icon_4 = path.join(__dirname, `../icons/mac/4.${format}`)
    this.icon_5 = path.join(__dirname, `../icons/mac/5.${format}`)
    this.icon_6 = path.join(__dirname, `../icons/mac/6.${format}`)
  }

  determineWindowPosition(bounds) {
    let windowSize = this.window.getSize()
    let screenSize = this.screen.getDisplayNearestPoint( this.screen.getCursorScreenPoint() ).workArea

    if (platform == 'win32') {
      return {
        x: Math.floor(bounds.x + bounds.width - windowSize[0] + 100),
        y: screenSize.y
      }
    } else if (platform == 'darwin') {
      return {
        x: Math.floor(bounds.x + bounds.width - windowSize[0] + 100),
        y: Math.floor(screenSize.height - (windowSize[1] - screenSize.y))
      }
    }
  }
}

module.exports = TrayIcon;
