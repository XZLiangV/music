<template>
  <transition
  :css="false"
  @enter="enter"
  @leave="leave">
    <!-- <div class="normal-player" v-show="this.$store.getters.isFullScreen"> -->
    <div class="normal-player" v-show="this.isFullScreen">
        <div class="player-wrapper">
            <PlayerHeader></PlayerHeader>
            <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
            <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
        </div>
        <div class="player-bg">
            <!-- http://p1.music.126.net/3b0hRaXXYPcy1lbp6vmnsg==/109951165559345066.jpg -->
            <img :src="currentSong.picUrl">
        </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong',
      'songs'
    ])
  },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 400 }, () => { done() })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 400 }, () => { done() })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      // this.getSongLyric(newValue.id)
      if (this.songs.length === 0) { return }
      if (newValue.id === undefined) { return }
      this.getSongLyric(newValue.id)
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      require: true
    },
    currentTime: {
      type: Number,
      default: 0,
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/base.scss';
.normal-player{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    @include bg_sub_color();
    .player-wrapper{
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 999;
    }
    .player-bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        img{
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: blur(8px);
        }
    }
}
</style>
