<template>
  <div>

    <cover-view class="user-info" v-if="!hadUserInfo">
      <cover-view class="logo-box">
        <cover-image src="https://avatars0.githubusercontent.com/u/5128154?v=3&s=120" alt="" class="logo" />
      </cover-view>

      <button class="getuserinfo-button" type="primary" size="default" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">获取用户信息</button>
    </cover-view>
    <div v-if="hadUserInfo">
      <div class="video padding-left-right-15px">
        <v-video :videoUrl="videoUrl"></v-video>
        <v-rating></v-rating>
      </div>
      <div class="heat-curriculum">
        <h3 class="title padding-left-right-15px">热门课程</h3>
        <v-video-list v-on:playVideo="navigateToCurriculum" :videoList="videoList"></v-video-list>
        <!-- <v-video-list :videoList="videoList"></v-video-list> -->
      </div>
    </div>

  </div>
</template>

<script>
import { wxLogin, wxGetUserInfo, wxAuthorize, wxRequestFn, wxGetSetting } from '@/service/wxService';

import video from '@/components/video';
import videoList from '@/components/video-list';
import rating from '@/components/rating';

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      videoUrl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      // videoUrl: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
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
      hadUserInfo: true
    }
  },

  components: {
    'v-video': video,
    'v-video-list': videoList,
    'v-rating': rating
  },

  methods: {

    navigateToCurriculum(url) {
      console.log('跳转课程页面',url);
      const pageUrl = '../commonSubpackage/curriculum/main';
      wx.navigateTo({url: pageUrl});
    },
    // 主动授权获取信息
    bindGetUserInfo(e) {

      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        this.userInfo = e.mp.detail.userInfo;
        this.hadUserInfo = true;
        this.wxSetStorage('userInfo', this.userInfo);
      }else{
        console.log('获取用户信息失败');
      }
    },
    // 缓存数据
    wxSetStorage(key, value) {
      wx.setStorage({
        'key': key,
        'data': value
      });
    },
    userLogin () {

      // 调用登录接口，可获取临时code
      wxLogin().then((res) => {

        // wxRequestFn({
        //   url: '',
        //   data: {
        //     code: ''
        //   },
        //   method: 'POST'
        // }).then((res) => {

        // });

        // 查询是否已授权
        wxGetSetting().then((res) => {
          // console.log(res);

          if(!res.authSetting['scope.userInfo']){
            this.hadUserInfo = false;
            wx.hideTabBar();
          }else{
            this.getUserInfo();
          }
        }).catch((er) => {
          cosnole.log('查询失败');
        });

      }).catch((er) => {
        console.log('login error');
      });

    },
    // 获取用户信息
    getUserInfo() {
      wxGetUserInfo().then((res) => {
        // console.log(res);
        this.userInfo = res.userInfo;
        this.hadUserInfo = true;
        this.wxSetStorage('userInfo', this.userInfo);
      }).catch((er) => {
        console.log(获取用户信息失败);
      });
    },
    toVideoContent($event) {
      console.log($event);
    }
  },

  created () {
    //
    this.userLogin();
  },
  watch: {
    hadUserInfo(newBoolean) {
      if(newBoolean) {
        wx.showTabBar();
      }
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin';
page{
  page-css()
}
.video,.heat-curriculum{
  background-color #fff
}
.heat-curriculum{
  .title{
    line-height 40px
    border-bottom: 1px solid #ccc
  }
}
.user-info{
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  text-align center
  background-color #fff
  z-index 99
  .logo-box{
    margin-top 80px
    text-align:center;
    .logo{
      display:inline-block;
      width 80px
      height 80px
    }
  }
  .getuserinfo-button{
    width 180px
    height 40px
    line-height 40px
  }

}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

.tabbars-box{
  width:100%;
}
</style>
