<template>
  <div class="curriculum">
    <div class="video padding-left-right-15px">
      <v-video :videoUrl="videoUrl"></v-video>
      <v-rating></v-rating>
    </div>
    <div class="curriculum-content">
      <div class="tab">
        <div class="tab-bar" :class="{active: tabShow === 'chapter'}" @click="tabShow = 'chapter'">章节</div>
        <div class="tab-bar" :class="{active: tabShow === 'hot'}" @click="tabShow = 'hot'">热门</div>
      </div>
      <div v-show="tabShow === 'chapter'" class="chapter padding-left-right-15px">
        <ul class="Primary-title">
          <li class="main-title" v-for="(items,index) in chapter" :key="index">
            <h1 @click="items.unfold = !items.unfold">{{items.title}}</h1>
            <ul v-show="items.unfold === true" class="secondary-title">
              <li class="sub-title" v-for="(item,idx) in items.sub_title" :key="idx" @click="palyChapter(item.videoUrl)">{{item.title}}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-show="tabShow === 'hot'">
        <v-video-list v-on:playVideo="playVideo" :videoList="videoList"></v-video-list>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuery } from '@/utils/index';
// import { wxLogin, wxGetUserInfo, wxAuthorize, wxRequestFn, wxGetSetting } from '@/service/wxService';

import video from '@/components/video';
import videoList from '@/components/video-list';
import rating from '@/components/rating';

export default {
  data () {
    return {
      videoUrl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      videoList: [
        {
          title: '这是视频标题',
          lecturer: '张大帅',
          heat: '3058',
          time: '2018-10-32',
          imgUrl: 'https://avatars0.githubusercontent.com/u/5128154?v=3&s=120',
          videoUrl: 'http://192.168.0.190:8080/PE2_Leopard_1080.mkv'
        },{
          title: '这是视频标题',
          lecturer: '张大帅',
          heat: '3058',
          time: '2018-10-32',
          imgUrl: 'https://avatars0.githubusercontent.com/u/5128154?v=3&s=120',
          videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
        },{
          title: '这是视频标题',
          lecturer: '张大帅',
          heat: '3058',
          time: '2018-10-32',
          imgUrl: 'https://avatars0.githubusercontent.com/u/5128154?v=3&s=120',
          videoUrl: 'http://www.runoob.com/try/demo_source/movie.mp4'
        },{
          title: '这是视频标题',
          lecturer: '张大帅',
          heat: '3058',
          time: '2018-10-32',
          imgUrl: 'https://avatars0.githubusercontent.com/u/5128154?v=3&s=120',
          videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
        },{
          title: '这是视频标题',
          lecturer: '张大帅',
          heat: '3058',
          time: '2018-10-32',
          imgUrl: 'https://avatars0.githubusercontent.com/u/5128154?v=3&s=120',
          videoUrl: 'http://www.runoob.com/try/demo_source/movie.mp4'
        },{
          title: '这是视频标题',
          lecturer: '张大帅',
          heat: '3058',
          time: '2018-10-32',
          imgUrl: 'https://avatars0.githubusercontent.com/u/5128154?v=3&s=120',
          videoUrl: 'http://192.168.0.190:8080/PE2_Leopard_1080.mkv'
        }
      ],
      tabShow: 'chapter',  //  chapter：章节； hot：热门；
      chapter: [
        {
          title: '这是一级目录',
          unfold: false,  //  是否已展开
          sub_title: [
            {
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            },{
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            },{
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            }
          ]
        },{
          title: '这是一级目录',
          unfold: false,  //  是否已展开
          sub_title: [
            {
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            },{
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            },{
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            }
          ]
        },{
          title: '这是一级目录',
          unfold: false,  //  是否已展开
          sub_title: [
            {
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            },{
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            },{
              title: '这是二级目录',
              videoUrl: 'http://www.runoob.com/try/demo_source/mov_bbb.mp4'
            }
          ]
        }
      ]
    }
  },

  components: {
    'v-video': video,
    'v-video-list': videoList,
    'v-rating': rating
  },

  mounted() {
    console.log('获取页面参数(课程id)',getQuery());
  },

  methods: {
    // 选择热门视频播放
    playVideo(url) {
      this.videoUrl = url;
    },
    // 选择章节播放
    palyChapter(url) {
      this.videoUrl = url;
    }
  },

  created () {

  },
  watch: {

  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import '../../../common/stylus/mixin';
page
  page-css()

.curriculum
  .video
    background-color #fff
  .curriculum-content
    background-color #fff
    .tab
      display flex
      // background-color #fff
      .tab-bar
        flex 1
        line-height 40px
        text-align center
        &.active
          border-bottom 2px solid #3ea6f9
    .chapter
      padding-top 15px
      padding-bottom 15px
      .Primary-title
        color #666
        .main-title
          line-height 32px
          font-size-16px()
          .secondary-title
            margin-left 16px
            .sub-title
              line-height 28px
              font-size-14px()
</style>
