<template>
  <div class="header">
    <div class="header-left" @click.stop="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{currentSong.name}}</h3>
      <p>{{currentSong.singer}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 666;
  .header-left, .header-right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left{
    @include bg_img('../../assets/images/down');
  }
  .header-title{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    @include font_size($font_medium);
    h3{
      @include one-line();
    }
    p{
      @include one-line();
    }
  }
}
</style>
