// https://api.github.com/repos/DmytroVasin/ListenChartsOnElectron/releases/latest

// https://github.com/jenslind/electron-gh-releases/blob/master/docs/2.x/api.md
// https://github.com/jenslind/electron-gh-releases/blob/master/src/GhReleases.js

// https://github.com/electron/electron-api-demos/blob/master/auto-updater.js

const { autoUpdater, dialog, shell } = require('electron')
const axios = require('axios')
const semver = require('semver')
const pjson = require('../../package.json');

const DARWIN = (process.platform === 'darwin')
const CURRENT_VERSION = '0.0.0' // pjson.version

class GithubUpdater {

  constructor (opts) {
    this.repoUrl = `https://api.github.com/repos/${opts.githubName}/${opts.githubProject}/releases/latest`

    this.currentVersion = opts.currentVersion
  }

  checkVersion (trayWindow) {
    axios(this.repoUrl).then( (response) => {
      const { tag_name, html_url } = response.data;

      if ( this._isLatestVersion(tag_name) ) {
        this._showDialog(trayWindow, html_url)
      } else {
        console.log('Your version is lates')
      }

    })
  }

  /**
   * Compare lastTagVersion with current version.
   */
  _isLatestVersion (lastTagVersion) {
    return semver.gt(lastTagVersion, CURRENT_VERSION)
  }

  /**
   * Get the feed URL to lates release
   */
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
      console.log('Install updates later.')
      return null;
    }

    shell.openExternal(url);
  }
}

module.exports = GithubUpdater;