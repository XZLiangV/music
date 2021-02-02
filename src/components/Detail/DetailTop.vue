<template>
  <div class="detail-top">
      <div class="img-container">
          <img :src="path">
          <div class="mask" ref="mask"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    changeMask (opacity) {
      this.$refs.mask.style.opacity = opacity
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top{
    width: 100%;
    height: 600px;
    overflow: hidden;
    .img-container{
      position: relative;
      .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0;
      }
    }
    img{
        width: 100%;
    }
}
</style>
