<template>
  <div class="video-list">
    <ul class="padding-left-right-15px">
      <li v-for="(item, index) in videoList" :key="index" class="list" @click="playVideo(item.videoUrl)">
        <div class="list-text">
          <h3>{{item.title}}</h3>
          <div>
            <span class="lecturer">讲师：{{item.lecturer}}</span>
            <span class="time">{{item.time}}</span>
            <span class="heat"><icon class="icon-heat"></icon>{{item.heat}}</span>
          </div>
        </div>
        <div class="list-img">
          <img :src="item.imgUrl" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['videoList'],
    methods: {
      playVideo(videoUrl) {
        // emit分发事件
        this.$emit('playVideo',videoUrl);
      }
    },
    created() {
      // console.log(this.videoList)
    }
  }
</script>

<style lang="stylus">
@import '../common/stylus/mixin';

  .video-list{
    background-color #fff
    .list:not(:last-child){
      border-1px(rgba(7,17,27,0.1))
    }
    .list {
      display flex
      height 50px
      font-size 0
      padding-top-bottom-10px()
      .list-text{
        padding-right 5px
        flex: 1;
        h3 {
          font-size: 16px;
          line-height 35px
        }
        div{
          font-size 12px
          color #999
        }
        .heat{
          padding-left 5px
        }
        .time{
          float right
        }
        .icon-heat{
          display inline-block
          width 12px
          height 12px
          background url(../../static/icon/heat.png) no-repeat center center;
          background-size 100% 100%
        }
      }
      .list-img{
          flex 0 0 64px;
          width 64px;
          img{
            width 60px
            height 50px
          }
      }

    }
  }
</style>
