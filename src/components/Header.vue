<template>
  <!--
    <div class="header" @click="changeTheme">
      <div class="header-left"></div>
      <div class="header-title">之乐音乐</div>
      <div class="header-right" @click.stop="accountClick"></div>
    </div>
  -->

  <!-- 注意点：不能直接给插槽设置样式 -->
   <div class="header" @click="changeTheme">
    <div class="left">
      <slot name="left">左边</slot>
    </div>
    <div class="center">
      <slot name="center">中间</slot>
    </div>
    <div class="right">
      <slot name="right" class="right">右边</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/variable';
@import '../assets/css/mixin';
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  @include bg_color();
  .left, .right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    *{
      width: 100%;
      height: 100%;
    }
  }
  /*
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
  */
}
</style>
