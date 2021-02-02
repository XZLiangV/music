<template>
  <div class="detail">
      <DetailHeader :title="playlist.name"></DetailHeader>
      <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
      <div class="bottom">
        <ScrollView ref="scrollview">
          <DetailBottom :playlist="playlist.tracks"></DetailBottom>
        </ScrollView>
      </div>
  </div>
</template>

<script>
import DetailHeader from '../components/Detail/DetailHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import { getPlayList, getAlbum, getArtistsSongs, getRankSongs } from '../api/index'
export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data () {
    return {
      playlist: {}
    }
  },
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') { // 调推荐歌单数据
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
        // console.log(data.playlist)
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') { // 调最新专辑数据
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') { // 调歌手歌曲
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') { // 调排行榜数据
      getRankSongs({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrolling((offsetY) => {
      // console.log(offsetY)
      if (offsetY < 0) {
        // console.log('up')
        // const scale = 10 * Math.abs(offsetY) / defaultHeight
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`

        const scale = 1.2 * Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
      } else {
        // console.log('down')
        const scale = 1 + offsetY / defaultHeight
        // console.log(scale)
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.detail{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    @include bg_sub_color();
    .bottom{
      position: fixed;
      top: 500px;
      right: 0;
      bottom: 0;
      left: 0;
    }
}
</style>
