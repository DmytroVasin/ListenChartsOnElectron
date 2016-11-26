const { Tray } = require('electron');
const platform = require('os').platform();
const path = require('path');

class TrayIcon {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    this._determineTrayImages();

    this.tray = new Tray(this.icon_default);

    this.tray.setToolTip('LCharts')
    this.tray.setHighlightMode('never')

    this.tray.on('click', this._toggleWindow.bind(this))
    this.tray.on('right-click', this._toggleWindow.bind(this))
    this.tray.on('double-click', this._toggleWindow.bind(this))
  }

  updateTrayImage(boolStatus) {
    if (boolStatus) {
      this._setRandomImage()
      this.trayTimeout = setTimeout( () => { this.updateTrayImage(true) }, 500);
    } else {
      this._setDefaultImage()
      clearTimeout(this.trayTimeout);
    }
  }

  _toggleWindow(e, bounds) {
    if ( this.mainWindow.window.isVisible() ) {
      this.mainWindow.window.hide();
    } else {
      this.mainWindow.setWindowPosition(bounds);
      this.mainWindow.window.show();
    }
  }

  _setRandomImage() {
    let iconName = 'icon_' + Math.floor(Math.random() * 7);
    this.tray.setImage(this[iconName]);
  }

  _setDefaultImage() {
    this.tray.setImage(this.icon_default);
  }

  _determineTrayImages() {
    let folder;
    if (platform == 'darwin') {
      folder = 'mac'
    } else if (platform == 'win32') {
      folder = 'win'
    }

    this.icon_default = path.join(__dirname, `../icons/${folder}/icon-22.png`)
    this.icon_0 = path.join(__dirname, `../icons/${folder}/0.png`)
    this.icon_1 = path.join(__dirname, `../icons/${folder}/1.png`)
    this.icon_2 = path.join(__dirname, `../icons/${folder}/2.png`)
    this.icon_3 = path.join(__dirname, `../icons/${folder}/3.png`)
    this.icon_4 = path.join(__dirname, `../icons/${folder}/4.png`)
    this.icon_5 = path.join(__dirname, `../icons/${folder}/5.png`)
    this.icon_6 = path.join(__dirname, `../icons/${folder}/6.png`)
  }
}

module.exports = TrayIcon;
