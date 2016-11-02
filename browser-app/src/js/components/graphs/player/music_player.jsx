// http://www.webdesign-flash.ro/p/rap/index.html#/player1?catid=0&trackid=19
// http://www.webdesign-flash.ro/p/rap/content/minimal_skin_dark/equalizer.png

import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player';

import { MusicPlayerList } from './music_player_list.jsx'
import { MusicPlayerHeader } from './music_player_header.jsx'

export class MusicPlayer extends Component {

  componentWillMount() {
    this.props.fetchList()
  }

  render() {
    return (

      <div id='lc-player'>
        <MusicPlayerHeader togglePause={this.props.togglePause} playing={this.props.playing} />

        <MusicPlayerList playList={this.props.playList} />
      </div>
    )
  }
}
