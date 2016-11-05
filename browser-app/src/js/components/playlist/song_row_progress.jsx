import React, { Component } from 'react'

export class SongRowProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentTime, duration } = this.props.player

    const seekWidth = currentTime === 0 ? 0 : Math.floor(currentTime / duration * 100);

    return (
      <div className='lc-playlist-row-progress' style={{ width: `${seekWidth}%` }} ></div>
    )
  }
}
