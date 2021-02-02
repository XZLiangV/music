<template>
  <Header class="header">
      <div slot="left" class="header-left"></div>
      <div slot="center" class="header-title">之乐音乐</div>
      <div slot="right" class="header-right" @click.stop="accountClick"></div>
  </Header>
</template>

<script>
import Header from './Header'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    accountClick () {
      this.$router.push('/account')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';
.header{
  .header-left{
    @include bg_img('../assets/images/logo');
  }
  .header-right{
    @include bg_img('../assets/images/account');
  }
  .header-title{
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
  }
}
</style>
