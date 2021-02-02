import mode from './modeType'
export default {
  isFullScreen: false, // 控制默认播放界面(总播放界面)是否显示
  isShowMiniPlayer: false, // 控制底部mini播放界面是否显示
  isShowListPlayer: false, // 控制列表播放界面是否显示
  isPlaying: false, // 控制音乐是否播放
  modeType: mode.loop, // 控制播放模式
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  curTime: 0,
  favoriteList: [],
  historyList: []
}
