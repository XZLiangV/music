<template>
  <div class="songlist">
    <ul class="song-list">
        <li v-for="value in songs" :key="value.id" class="item" @click.stop="selectMusic(value.id)">
          <!-- <img :src="value.picUrl"> -->
          <img v-lazy="value.picUrl">
          <div>
            <h3>{{value.name}}</h3>
            <p>{{value.singer}}</p>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongListItem',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    }
  }
}
</script>

<style scoped lang="scss">
 @import '../assets/css/mixin';
 @import '../assets/css/variable';
 .song-list{
    width: 100%;
    .item{
      width: 100%;
      height: 160px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      &:last-child{
        margin-bottom: 0;
      }
      img{
        width: 120px;
        height: 120px;
        margin-right: 20px;
        border-radius: 10px;
      }
      div{
        padding-right: 20px;
        width: calc(100% - 120px);
      }
      h3{
        @include font_color();
        @include font_size($font_medium);
        @include one-line();
      }
      p{
        @include font_color();
        @include font_size($font_medium_s);
        @include one-line();
        opacity: .8;
        margin-top: 5px;
      }
    }
  }
</style>
