<template>
    <div class="player-bottom">
        <div class="player-progress">
            <span ref="eleCurrentTime">00:00</span>
            <div class="progress-bar" @click="progressClick" ref="progressBar">
                <div class="progress-line" ref="progressLine">
                    <div class="progress-dot"></div>
                </div>
            </div>
            <span ref="eleTotalTime">00:00</span>
        </div>
        <div class="player-controll">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <div class="prev" @click="prev"></div>
            <div class="play" @click="play" ref="play"></div>
            <div class="next" @click="next"></div>
            <div class="favorite" @click="favorite" :class="{'active': isFavorite(this.currentSong)}"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
import { formartTime } from '../../tools/tools'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteSong'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
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
    progressClick (e) {
      // 计算进度条的位置
      // const normalLeft = e.target.offsetLeft
      const normalLeft = this.$refs.progressBar.offsetLeft
      const eventLeft = e.pageX
      const clickLeft = eventLeft - normalLeft
      // const progressWidth = e.target.offsetWidth
      const progressWidth = this.$refs.progressBar.offsetWidth
      const value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'

      // 计算点击后应该从什么地方播放
      const currentTime = this.totalTime * value
      // console.log(currentTime)
      this.setCurrentTime(currentTime)
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (song) {
      // 数组find方法 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
      // 如果没有符合条件的元素返回 undefined
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
      'currentIndex',
      'currentSong',
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
    totalTime (newValue, oldValue) {
      const time = formartTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      // 1 格式化当前播放的时间
      const time = formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // 2 根据当前播放的时间计算比例
      const vaule = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = vaule + '%'
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
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.player-bottom{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    .player-progress{
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            @include font_size($font_small);
            @include font_color();
        }
        .progress-bar{
            width: 100%;
            height: 10px;
            margin: 0 20px;
            background: #fff;
            border-radius: 4px;
            .progress-line{
                width: 0%;
                height: 100%;
                background: #ccc;
                border-radius: 4px;
                position: relative;
                .progress-dot{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #fff;
                    position: absolute;
                    top: 50%;
                    left: 100%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    .player-controll{
        width: 80%;
        margin: 0 auto;
        padding: 20px 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
            width: 84px;
            height: 84px;
        }
        .mode{
            &.loop{
              @include bg_img('../../assets/images/loop');
            }
            &.one{
              @include bg_img('../../assets/images/one');
            }
            &.random{
              @include bg_img('../../assets/images/shuffle');
            }
        }
        .prev{
            @include bg_img('../../assets/images/prev')
        }
        .play{
            @include bg_img('../../assets/images/play');
            &.active{
                @include bg_img('../../assets/images/pause');
            }
        }
        .next{
            @include bg_img('../../assets/images/next');
        }
        .favorite{
            @include bg_img('../../assets/images/un_favorite');
            &.active{
              @include bg_img('../../assets/images/favorite');
            }
        }
    }
}
</style>
