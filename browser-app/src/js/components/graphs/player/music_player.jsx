import React, { Component } from 'react'

export class MusicPlayer extends Component {

  componentWillMount() {
    // this.props.actions.fetchGraph()
  }

  render() {
    return (
<div id="amazingaudioplayer-8">
  <div className="amazingaudioplayer-track-player">
    <div className="amazingaudioplayer-image">
      <img src="https://amazingaudioplayer.com/wp-content/uploads/amazingaudioplayer/8/audios/desert-sunrise.jpg" />
    </div>
    <div className="amazingaudioplayer-text">
      <div className="amazingaudioplayer-title">Peaceful Dawn</div>
      <div className="amazingaudioplayer-info">By pinkzebra AudioJungle</div>
    </div>

    <div className="amazingaudioplayer-bar">
      <div className="amazingaudioplayer-prev"></div>
      <div className="amazingaudioplayer-play"></div>
      <div className="amazingaudioplayer-next"></div>
    </div>
  </div>

  <ul className="amazingaudioplayer-tracks">
    <li className="amazingaudioplayer-track-item">1. In The Moment of Inspiration <span>02:34</span>
    </li>
    <li className="amazingaudioplayer-track-item">2. Inspiring Ideas into Motion <span>02:17</span>
    </li>
    <li className="amazingaudioplayer-track-item amazingaudioplayer-track-item-active">3. Peaceful Dawn <span>02:09</span>
    </li>
    <li className="amazingaudioplayer-track-item">4. Photos and Memories <span>02:13</span>
    </li>
    <li className="amazingaudioplayer-track-item">5. Soaring Spirit <span>02:10</span>
    </li>
  </ul>

</div>
    )
  }
}
