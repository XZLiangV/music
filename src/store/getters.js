export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  modeType (state) {
    return state.modeType
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  songs (state) {
    return state.songs
  },
  currentIndex (state) {
    return state.currentIndex
  },
  currentSong (state) {
    // return state.songs[state.currentIndex]
    let obj = {
      name: '',
      singer: '',
      picUrl: null,
      id: null
    }
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
  },
  currentLyric (state) {
    return state.currentLyric
  },
  curTime (state) {
    return state.curTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  }
}
