<template>
  <div class="mine">
    <navigator open-type="navigateTo" :url="abstract.navigate_url" class="abstract padding-left-right-15px">
      <div class="avatar">
        <img class="avatar-img" :src="abstract.avatar_url"/>
      </div>
      <div class="desc icon-right">
        <h4 class="nickname">{{abstract.nickname}}</h4>
        <p class="motto no-wrap">{{abstract.motto}}</p>
      </div>
    </navigator>
    <div class="binding-mobile">
      <navigation-list :list="bindingMobile"></navigation-list>
    </div>
    <div class="list">
      <navigation-list :list="mineList"></navigation-list>
    </div>
    <div class="list">
      <navigation-list :list="aboutList"></navigation-list>
    </div>

    <div class="button-quit">
      <navigator open-type="exit" target="miniProgram" type="button" class="quit">退     出</navigator>
    </div>
  </div>
</template>

<script>
import { wxGetStorage } from '@/service/wxService';

import { formatTime } from '@/utils/index'
import navigationList from '@/components/navigationList'

export default {

  data () {
    return {
      // 用户概要
      abstract: {
        avatar_url: '',
        nickname: '用户昵称',
        motto: 'id:wdhggdfhsgkh54seh7634hg868703432',
        navigate_url: '../mineSubpackage/mine-detail/main'
      },
      bindingMobile: [{
        text: '绑定手机',
        navigate_url: '../mineSubpackage/binding-mobile/main'
      }],
      mineList: [{
        text: '常见问题',
        navigate_url: '../mineSubpackage/common-problem/main'
      },{
        text: '建议反馈',
        navigate_url: '../mineSubpackage/feedback/main'
      }],
      aboutList: [{
        text: '关于',
        navigate_url: '../mineSubpackage/about/main'
      }]
    }
  },

  components: {
    'navigation-list': navigationList
  },

  mounted() {
    // 获取缓存的用户信息
    wxGetStorage({key: 'userInfo'}).then((res) => {
      // console.log(res)
      this.abstract.avatar_url = res.data.avatarUrl;
      this.abstract.nickname = res.data.nickName;
    });

  }

}
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin';

page{
  page-css()
}
.mine{
  .abstract{
    display: flex;
    background-color: #ffffff;
    margin-bottom: 30px;
    .avatar{
      width: 80px;
      flex: 0 0 80px;
      .avatar-img{
        width:64px;
        height: 64px;
        border-radius: 50%;
      }
    }
    .desc{
      flex: 1;
      padding-top: 10px;
      padding-right: 20px;
      overflow: hidden;
      box-sizing-norm
      .nickname{
        font-size:14px;
        color: #333;
      }
      .motto{
        width: 100%;
        font-size: 13px;
        color: #666;
      }
    }
  }
  .list, .binding-mobile{
    margin-bottom: 20px;
    background-color: #ffffff;
  }
  // .binding-mobile{
  //   margin-bottom: 20px;
  // }
  .button-quit{
    margin-top: 20px;
    .quit{
      margin: auto
      appearance: none;
      height: 50px;
      width:300px;
      line-height: 50px;
      color: #fff;
      text-align: center
      background-color: #2196F3;
      border: none;
      border-radius: 25px;
      box-shadow: 0 2px  10px #2196f3;
      &.button-hover{
        background-color: #108ff5;
      }
    }
  }
}
</style>
