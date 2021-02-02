<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="mini-player" v-show="isShowMiniPlayer">
        <div class="player-wrapper">
            <div class="player-left" @click.stop="showNormalPlayer">
                <!-- http://p1.music.126.net/3b0hRaXXYPcy1lbp6vmnsg==/109951165559345066.jpg -->
                <img :src="currentSong.picUrl" ref="cd">
                <div class="player-title">
                    <h3>{{currentSong.name}}</h3>
                    <p>{{currentSong.singer}}</p>
                </div>
            </div>
            <div class="player-right">
              <div class="play" @click="play" ref="play"></div>
              <div class="list" @click.stop="showList"></div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    showNormalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    showList () {
      // this.$emit('showList')
      this.setListPlayer(!this.isShowListPlayer)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 400 }, () => { done() })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 400 }, () => { done() })
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'isShowListPlayer',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newVlaue, oldValue) {
      if (newVlaue) {
        this.$refs.play.classList.add('active')
        this.$refs.cd.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cd.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.mini-player{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 130px;
    .player-wrapper{
        width: 100%;
        height: 100%;
        @include bg_color();
        display: flex;
        justify-content: space-between;
        align-items: center;
        .player-left{
            display: flex;
            padding-left: 30px;
            img{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-right: 20px;
                animation: sport 8s linear infinite;
                animation-play-state: paused;
                &.active{
                  animation-play-state: running;
                }
            }
            .player-title{
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 370px;
                h3{
                    @include font_size($font_medium);
                    @include font_color();
                    @include one-line();
                }
                p{
                    @include font_size($font_medium_s);
                    @include font_color();
                    @include one-line();
                }
            }
        }
        .player-right{
            display: flex;
            align-items: center;
            .play{
                width: 84px;
                height: 84px;
                @include bg_img('../../assets/images/play');
                &.active{
                  @include bg_img('../../assets/images/pause');
                }
            }
            .list{
                width: 130px;
                height: 130px;
                @include bg_img('../../assets/images/list');
            }
        }
    }
}
@keyframes sport {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>
