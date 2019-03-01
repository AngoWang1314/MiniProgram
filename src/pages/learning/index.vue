<template>
  <div class="leaning">
    <div class="padding-left-right-15px">
      <div class="motto">
        <div class="motto-pic"><img :src="motto.img_url" alt=""></div>
        <div class="motto-text">{{motto.text}}</div>
      </div>
    </div>
    <div class="lean-list">
      <div class="lean-flex">
        <div><navigator url="../learningSubpackage/course/main">课程</navigator></div>
        <div><navigator url="../learningSubpackage/assignment/main"><van-badge title="作业" info="8" /></navigator></div>
      </div>
      <div class="lean-flex">
        <div><navigator url="../learningSubpackage/examination-paper/main">试卷</navigator></div>
        <div><navigator url="../learningSubpackage/mistakes/main">错题集</navigator></div>
      </div>
    </div>
  </div>
</template>

<script>
import { wxLogin, wxGetUserInfo, wxAuthorize, wxRequestFn, wxGetSetting } from '@/service/wxService';

export default {
  data () {
    return {
      motto: {
        img_url: '../../static/images/luxun.jpg',
        text: '真的猛士，敢于直面惨淡的人生，敢于正视淋漓的鲜血。'
      }
    }
  },

  components: {

  },

  methods: {

  },

  created () {

  },
  watch: {

  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../common/stylus/mixin';
  page
    page-css()
  .leaning
    .motto
      margin 20px
      position relative
      display flex
      height 90px
      justify-items center
      align-items center
      background-color #fff
      box-shadow 0 2px 5px #aaa
      .motto-pic
        flex 0 0 60px
        position absolute
        left -10px
        top 15px
        width 60px
        height 60px
        padding 2px
        background-color #fff
        box-shadow 0 0 5px #aaa
        img
          margin 2px
          width 56px
          height 56px
      .motto-text
        flex 1
        padding-left 70px
        color #999
        align-items center
        font-size-14px()
    .lean-list
      margin-top 10px
      text-align center
      font-size-16px()
      background-color #fff
      box-shadow 0 0 8px #aaa
      .lean-flex
        display -webkit-flex
        display flex
        line-height 60px
        color #666
        .van-badge
          padding 0
          line-height 60px
          color #666
          font-size-16px()
          border none
          background-color transparent
          .van-info
            right 15px !important
            top 10px
        >div
          flex 1
        >div:not(:last-child)
          border-right 1px solid #ccc
      .lean-flex:not(:last-child)
        border-bottom 1px solid #ccc

</style>
