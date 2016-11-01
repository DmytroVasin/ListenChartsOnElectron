// http://www.webdesign-flash.ro/p/rap/index.html#/player1?catid=0&trackid=19
// http://www.webdesign-flash.ro/p/rap/content/minimal_skin_dark/equalizer.png

import React, { Component } from 'react'

import { MusicPlayerList } from './music_player_list.jsx'
import { MusicPlayerHeader } from './music_player_header.jsx'

export class MusicPlayer extends Component {

  componentWillMount() {
    this.props.fetchList()
  }

  render() {
    return (

      <div id='lc-player'>
        <audio id='lc-player-audio' src="http://cs1-31v4.vk-cdn.net/p9/95b8b33cd24f39.mp3?extra=GBdkz2r_WZgaTqCJb8eXkwnwS-dGe8CcVZKSY3DOctJYpKyDSr5WOoyPYnJQzJnZVH1QegqJO6zBz-WHw8T3P4Ngn3_z51TiwIDZfnfNMl-q5bdndIGKXKteHtMeIn75t3V5pQ6xxjZmoA"></audio>

        <MusicPlayerHeader togglePause={this.props.togglePause} playing={this.props.playing} />

        <MusicPlayerList playList={this.props.playList} />
      </div>
    )
  }
}
