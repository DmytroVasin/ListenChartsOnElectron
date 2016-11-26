// curl -i https://api.github.com/repos/DmytroVasin/ListenChartsOnElectron/releases/latest

const { autoUpdater, dialog, shell } = require('electron')
const axios = require('axios')
const semver = require('semver')
const platform = require('os').platform();
const pjson = require('../../package.json');

const PLATFORM_AVAILABLE = (platform == 'win32' || platform == 'darwin')

const CURRENT_VERSION = pjson.version

class GithubUpdater {

  constructor (opts) {
    this.repoUrl = `https://api.github.com/repos/${opts.githubName}/${opts.githubProject}/releases/latest`

    this.currentVersion = opts.currentVersion
  }

  checkVersion (trayWindow) {
    if (!PLATFORM_AVAILABLE) return null;

    axios(this.repoUrl).then( (response) => {
      const { tag_name, html_url } = response.data;

      if (this._hasNewVersion(tag_name)) {
        this._showDialog(trayWindow, html_url)
      };
    })
  }

  _hasNewVersion (latestVersion) {
    return semver.gt(latestVersion, CURRENT_VERSION)
  }

  _getFeedUrlFromResponse (response) {
    if (PLATFORM_AVAILABLE) {
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
