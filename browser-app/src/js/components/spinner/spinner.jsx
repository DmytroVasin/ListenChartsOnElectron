import React, { Component } from 'react'

export class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ipcRenderer.on('start-track-downloading', this.handleStartTrackDownloading);
    ipcRenderer.on('finish-track-downloading', this.handleFinishTrackDownloading);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('start-track-downloading', this.handleStartTrackDownloading);
    ipcRenderer.removeListener('finish-track-downloading', this.handleFinishTrackDownloading);
  }

  handleStartTrackDownloading = (event) => {
    this.props.actions.startTrackDownloading()
  }

  handleFinishTrackDownloading = (event) => {
    this.props.actions.finishTrackDownloading()
  }

  render() {
    let globalLoading = this.props.app.downloadLoading

    return (
      globalLoading ? <div className='loading-container'><div className='loading'></div></div> : null
    )
  }
}
