import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    let globalLoading = this.props.app.downloadLoading

    return (
      globalLoading ? <div className='spinner-container'><div className='icon-spinner'></div></div> : null
    )
  }
}
