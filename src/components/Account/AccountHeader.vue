<template>
  <!-- <div class="header" @click="changeTheme">

  </div> -->

  <Header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <ul slot="center" class="header-title">
        <li :class="{'active': switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
        <li :class="{'active': switchNum === 1}" @click.stop="switchItem(1)">最近听的</li>
    </ul>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'AccountHeader',
  components: {
    Header
  },
  data () {
    return {
      switchNum: 0
    }
  },
  methods: {
    back () {
      window.history.back()
    },
    switchItem (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header{
  .header-left{
    @include bg_img('../../assets/images/back');
  }
  .header-right{
    @include bg_img('../../assets/images/more');
  }
  .header-title{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include font_size($font_medium_s);
    margin-top: 20px;
    border-radius: 6px;
    overflow: hidden;
    li{
        height: 60px;
        line-height: 60px;
        border: 1px solid #ffffff;
        padding: 0 25px;
        color: #ffffff;
        &.active{
            background: rgba(255, 255, 255, .3);
        }
    }
  }
}
</style>
