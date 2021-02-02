<template>
    <swiper :options="swiperOptions" class="banner">
        <swiper-slide  class="cd">
            <div class="cd-wrapper" ref="cdWrapper">
                <!-- http://p1.music.126.net/3b0hRaXXYPcy1lbp6vmnsg==/109951165559345066.jpg -->
                <img :src="currentSong.picUrl">
            </div>
            <p>{{getFirstLyric ()}}</p>
        </swiper-slide>
        <swiper-slide  class="lyric" ref="lyric">
            <ScrollView ref="scrollView">
                <ul>
                    <li v-for="(value, key) in currentLyric" :key="key" :class="{'active':currentLineNum===key}">{{value}}</li>
                </ul>
            </ScrollView>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOptions: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  methods: {
    getFirstLyric () {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    // 递归查找需要高亮的歌词
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      /*
      // 歌词高亮同步
      const lineNum = Math.floor(newValue) + ''
      const result = this.currentLyric[lineNum]
      if (result !== undefined && result !== '') {
        this.currentLineNum = lineNum
        // 歌词滚动同步
        const currentLyricTop = document.querySelector('.lyric .active').offsetTop
        const lyricHeight = this.$refs.lyric.$el.offsetHeight
        if (currentLyricTop > lyricHeight / 2) {
          this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        } else {
          this.$refs.scrollView.scrollTo(0, 0, 100)
        }
      }
      */

      // 歌词高亮同步
      const lineNum = Math.floor(newValue) + ''
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 歌词滚动同步
      const currentLyricTop = document.querySelector('.lyric .active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.banner{
    position: fixed;
    top: 150px;
    bottom: 180px;
    left: 0;
    right: 0;
}
.cd{
    .cd-wrapper{
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 30px solid #eeeeee;
        overflow: hidden;
        margin: 0 auto;
        animation: sport 8s linear infinite;
        animation-play-state: paused;
        &.active{
            animation-play-state: running;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
    p{
        @include font_size($font_medium);
        @include font_color();
        text-align: center;
        margin-top: 70px;
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
.lyric{
    li{
        text-align: center;
        @include font_size($font_medium);
        @include font_color();
        margin: 10px 0;
        padding: 0 30px;
        transition: all .3s;
        &:last-of-type{
            padding-bottom: 70%;
        }
        &.active{
          @include font_size($font_large);
          color: #ffffff;
        }
    }
}
</style>

<style lang="scss">
@import '../../assets/css/mixin.scss';
.my-bullet{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    margin: 0 10px;
    transition: all .5s;
}
.my-bullet-active{
    width: 50px;
    border-radius: 10px;
    @include bg_color();
}
</style>
