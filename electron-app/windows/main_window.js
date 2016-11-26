const isDev = (process.env.NODE_ENV === 'development');

const electron = require('electron');
const { BrowserWindow } = electron;
const platform = require('os').platform();
const path = require('path');

class MainWindow {
  constructor() {

    let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/main_page.html'

    this.window = new BrowserWindow({
      show: false,
      height: 325,
      width: 800,
      frame: false,
      hasShadow: false,
      transparent: true,
      resizable: false
    });

    this.window.loadURL(htmlPath);

    if ( !isDev ) {
      this.window.on('blur', () => {
        this.window.hide();
      });
    }
  }

  setWindowSize(state) {
    let height;

    if ( state ) {
      height = 325
    } else {
      height = 95
    }

    this.window.setSize(800, height);
  }

  setWindowPosition(bounds) {
    let { x, y } = this._determineWindowPosition(bounds);
    this.window.setPosition(x, y);
  }

  _determineWindowPosition(bounds) {
    let windowSize = this.window.getSize()
    let screenSize = electron.screen.getDisplayNearestPoint( electron.screen.getCursorScreenPoint() ).workArea

    if (platform == 'darwin') {
      return {
        x: Math.floor(bounds.x + bounds.width - windowSize[0] + 100),
        y: screenSize.y
      }
    } else if (platform == 'win32') {
      return {
        x: Math.floor(bounds.x + bounds.width - windowSize[0] + 100),
        y: Math.floor(screenSize.height - (windowSize[1] - screenSize.y))
      }
    }
  }
}

module.exports = MainWindow;
