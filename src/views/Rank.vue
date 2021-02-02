<template>
    <div class="rank">
      <div class="rank-wrapper">
        <ScrollView>
          <ul>
            <li v-for="(value, key) in category.titles" :key="key">
              <h3 class="group-title">{{value}}</h3>
              <ul class="normal-group" v-if="value === '官方榜'">
                <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectItem(obj.id)">
                  <div class="rank-left">
                    <img v-lazy="obj.rank.coverImgUrl">
                    <p>{{obj.rank.updateFrequency}}</p>
                  </div>
                  <div class="rank-right">
                    <p v-for="(song, index) in obj.rank.tracks" :key="song.first">{{index}}.{{song.first}}-{{song.second}}</p>
                  </div>
                </li>
              </ul>
              <ul class="other-group" v-else>
                <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectItem(obj.id)">
                  <div class="rank-top">
                    <img v-lazy="obj.rank.coverImgUrl">
                    <p>{{obj.rank.updateFrequency}}</p>
                  </div>
                  <div class="rank-bottom">
                    <p>{{obj.rank.name}}</p>
                  </div>
                </li>
                <i></i>
                <i></i>
                <i></i>
              </ul>
            </li>
          </ul>
        </ScrollView>
      </div>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getTopListDetail } from '../api/index'
export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  methods: {
    selectItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  },
  data () {
    return {
      category: {}
    }
  },
  created () {
    getTopListDetail()
      .then(result => {
        // console.log(result)
        this.category = result
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/variable';
@import '../assets/css/mixin';
.rank{
  width: 100%;
  height: 100%;
  .rank-wrapper{
    position: fixed;
    top: 184px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group-title{
      @include font_color();
      @include font_size($font_medium);
      font-weight: bold;
      padding-left: 20px;
    }
    .normal-group{
        li{
          display: flex;
          align-items: center;
          padding: 10px 20px;
          box-sizing: border-box;
          .rank-left{
            position: relative;
            img{
              width: 200px;
              height: 200px;
              border-radius: 10px;
            }
            p{
              position: absolute;
              left: 10px;
              bottom: 10px;
              color: #fff;
              @include font_size($font_medium_s);
            }
          }
          .rank-right{
            margin-left: 20px;
            p{
              @include font_color();
              @include font_size($font_medium_s);
              padding: 10px 0;
            }
          }
        }
    }
    .other-group{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          padding: 10px 20px;
          box-sizing: border-box;
          .rank-top{
            position: relative;
            img{
              width: 200px;
              height: 200px;
              border-radius: 10px;
            }
            p{
              position: absolute;
              left: 10px;
              bottom: 10px;
              color: #fff;
              @include font_size($font_medium_s);
            }
          }
          .rank-bottom{
            width: 200px;
            @include no-wrap();
            p{
              padding: 10px 0;
              @include font_color();
              @include font_size($font_medium_s);
            }
          }
        }
        i{
          flex: none;
          width: 250px;
          height: 0;
        }
    }
  }
}
.v-enter{
    transform: translateX(100%);
}
.v-enter-to{
    transform: translateX(0);
}
.v-enter-active{
    transition: transform .8s;
}
.v-leave{
    transform: translateX(0);
}
.v-leave-to{
    transform: translateX(100%);
}
.v-leave-active{
    transition: transform .8s;
}
</style>
