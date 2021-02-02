<template>
  <Header>
    <div slot="left" class="header-left" @click.stop="back"></div>
    <div slot="center" class="header-title">{{title}}</div>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header-left{
  @include bg_img('../../assets/images/back');
}
.header-right{
  @include bg_img('../../assets/images/more');
}
.header-title{
  line-height: 100px;
  color: #fff;
  font-weight: bold;
  width: 75%;
  @include one-line();
  @include font_size($font_medium);
}
</style>
