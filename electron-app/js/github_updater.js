// https://api.github.com/repos/DmytroVasin/ListenChartsOnElectron/releases/latest

const { autoUpdater, dialog, shell } = require('electron')
const axios = require('axios')
const semver = require('semver')
const pjson = require('../../package.json');

const WIN32 = (process.platform === 'win32')
const DARWIN = (process.platform === 'darwin')

const CURRENT_VERSION = pjson.version

class GithubUpdater {

  constructor (opts) {
    this.repoUrl = `https://api.github.com/repos/${opts.githubName}/${opts.githubProject}/releases/latest`

    this.currentVersion = opts.currentVersion
  }

  checkVersion (trayWindow) {
    if (!DARWIN && !WIN32) return null;

    axios(this.repoUrl).then( (response) => {
      const { tag_name, html_url } = response.data;

      if (this._isLatestVersion(tag_name)) return null;

      this._showDialog(trayWindow, html_url)
    })
  }

  _isLatestVersion (latestVersion) {
    return semver.gt(CURRENT_VERSION, latestVersion)
  }

  _getFeedUrlFromResponse (response) {
    if (DARWIN) {
      return response.html_url
    } else {
      console.log('Your platform is not supported.')
      return null;
    }
  }

  _showDialog (trayWindow, url) {
    let response = dialog.showMessageBox(trayWindow, {
      type: 'info',
      buttons: ['Visit', 'Later'],
      title: 'LCharts Updates',
      message: 'The new version has been released.',
      detail: 'Please download new version of an app by url.'
    });

    if (response) {
      return null;
    }

    shell.openExternal(url);
  }
}

module.exports = GithubUpdater;
