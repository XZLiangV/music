<template>
  <transition
  :css="false"
  @enter="enter"
  @leave="leave">
    <div class="list-player" v-show="isShowListPlayer">
        <div class="player-wrapper">
          <div class="player-top">
            <div class="top-left">
                <div class="mode loop" @click="mode" ref="mode"></div>
                <p v-if="this.modeType === 0">顺序播放</p>
                <p v-if="this.modeType === 1">单曲循环</p>
                <p v-if="this.modeType === 2">随机播放</p>
            </div>
            <div class="top-right">
                <div class="del" @click="delAll"></div>
            </div>
          </div>
          <div class="player-middle">
            <ScrollView ref="scrollview">
              <ul ref="play">
                <li class="item" v-for="(value, index) in songs" :key="value.id" @click="selectMusic(index)">
                  <div class="item-left">
                    <div class="item-play" @click.stop="play" v-show="currentIndex === index"></div>
                    <p>{{value.name}}</p>
                  </div>
                  <div class="item-right">
                    <div class="item-favorite" @click.stop="favorite(value)" :class="{'active': isFavorite(value)}"></div>
                    <div class="item-del" @click.stop="del(index)"></div>
                  </div>
                </li>
              </ul>
            </ScrollView>
          </div>
          <div class="player-bottom">
            <p @click.stop="hidden">关闭</p>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  data: function () {
    return {
      isShow: false
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex',
      'setFavoriteSong'
    ]),
    show () {
      this.isShow = true
    },
    hidden () {
      // this.isShow = false
      this.setListPlayer(!this.isShowListPlayer)
    },
    enter (el, done) {
      Velocity(el, 'transition.slideUpIn', { duration: 400 }, () => { done() })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideUpOut', { duration: 400 }, () => { done() })
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    del (index) {
      this.setDelSong(index)
    },
    delAll () {
      this.setDelSong()
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
    },
    favorite (value) {
      this.setFavoriteSong(value)
    },
    isFavorite (song) {
      const result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'isShowListPlayer',
      'songs',
      'currentIndex',
      'favoriteList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    isShowListPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollview.refresh()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.list-player{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    @include bg_sub_color();
    .player-wrapper{
      .player-top{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-left{
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 20px;
          .mode{
            width: 56px;
            height: 56px;
            margin-right: 20px;
            &.loop{
              @include bg_img('../../assets/images/small_loop');
            }
            &.one{
              @include bg_img('../../assets/images/small_one');
            }
            &.random{
              @include bg_img('../../assets/images/small_shuffle');
            }
          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .top-right{
          .del{
            width: 84px;
            height: 84px;
            @include bg_img('../../assets/images/small_del');
          }
        }
      }
      .player-middle{
        height: 700px;
        overflow: hidden;
        ul {
          &.active{
            .item{
              .item-play{
                @include bg_img('../../assets/images/small_pause');
              }
            }
          }
        }
        .item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          height: 100px;
          border-top: 1px solid #ccc;
          .item-left{
            display: flex;
            align-items: center;
            .item-play{
              width: 56px;
              height: 56px;
              margin-right: 20px;
              @include bg_img('../../assets/images/small_play');
            }
            p{
              @include font_size($font_medium_s);
              @include font_color();
            }
          }
          .item-right{
            display: flex;
            align-items: center;
            .item-favorite{
              width: 56px;
              height: 56px;
              @include bg_img('../../assets/images/small_un_favorite');
              &.active{
                @include bg_img('../../assets/images/small_favorite');
              }
            }
            .item-del{
              width: 50px;
              height: 50px;
              margin-left: 20px;
              @include bg_img('../../assets/images/small_close');
            }
          }
        }
      }
      .player-bottom{
        p{
          height: 100px;
          line-height: 100px;
          text-align: center;
          color: #fff;
          @include bg_color();
          @include font_size($font_medium);
        }
      }
    }
}
</style>
