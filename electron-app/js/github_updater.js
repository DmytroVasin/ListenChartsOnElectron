// https://api.github.com/repos/DmytroVasin/ListenChartsOnElectron/releases/latest

// https://github.com/jenslind/electron-gh-releases/blob/master/docs/2.x/api.md
// https://github.com/jenslind/electron-gh-releases/blob/master/src/GhReleases.js

// https://github.com/electron/electron-api-demos/blob/master/auto-updater.js

const { autoUpdater, dialog } = require('electron')
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


  /**
   * Check for updates.
   */
  checkVersion () {
    this._getLatestTagRelease().then(response => {
      if (!response.tag_name) {
        console.log('Unable to get latest release tag from Github.')
      }

      if ( this._isLatestVersion(response.tag_name) ) {

        console.log('Your version is not latest')
        let packageUrl = this._getFeedUrlFromResponse(response)

        console.log('before setFeedURL')
        console.log(packageUrl)


          autoUpdater.on('checking-for-update', function() {
            console.log('Checking for update');
          })
          autoUpdater.on('update-available', function() {
            console.log('Update available');
          })
          autoUpdater.on('update-not-available', function() {
            console.log('Update not available');
          })
          autoUpdater.on('update-downloaded', function() {
            console.log('Update downloaded');
          });
          autoUpdater.on('error', function() {
            console.log(',.asdasdasd')
          });


        console.log('<><<><<M<>M<>M<>M><M')
        this.autoUpdater.setFeedURL(packageUrl)
        console.log('<><<><<M<>M<>M<>M><M')
        this.autoUpdater.checkForUpdates()
        // this._showDialog()
        //
      } else {
        console.log('Your have latest version')
      }
    })
  }

  /**
   * Get tags from this.repoUrl
   */
  _getLatestTagRelease () {
    return axios(this.repoUrl)
      .then(respond => {
        return respond.data
      })
      .catch(err => {
        return null
      })
  }

  /**
   * Compare lastTagVersion with current version.
   */
  _isLatestVersion (lastTagVersion) {
    return semver.gt(lastTagVersion, CURRENT_VERSION)
  }

  /**
   * Get the feed URL from this.repoUrl
   */
  _getFeedUrlFromResponse (response) {
    if (DARWIN) {
      console.log('Url for download latest release:')
      return response.assets[0].browser_download_url
    } else {
      console.log('Your platform is not supported.')
      return null;
    }

  }

  _showDialog () {
    // showDialog(message, detail, positive_button, callback) {
    let index = dialog.showMessageBox({
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'LCharts',
      message: 'The new version has been released. Please restart the application to apply the updates.',
      detail: 'detail'
    });

    if (index === 1) {
      console.log('Install updates later.')
      return null;
    }

    console.log('Install updates now.')

  }
}

module.exports = GithubUpdater;
