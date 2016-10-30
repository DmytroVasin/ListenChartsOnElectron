const path = require('path');
const { BrowserWindow } = require('electron');

class MainWindow {
  constructor() {

    let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/main_page.html'

    this.window = new BrowserWindow({
      show: false,
      height: 400,
      width: 500,
      frame: false,
      transparent: true
    });

    this.window.loadURL(htmlPath);

    // this.window.on('blur', () => {
    //   this.window.hide();
    // });
  }
}

module.exports = MainWindow;
