<template>
  <div class="course">

    <navigator :url="'../../commonSubpackage/curriculum/main?id='+item.id" v-for="(item, index) in course_list" :key="index" class="course-box">
      <img :src="item.url" alt="">
    </navigator>

  </div>
</template>

<script>
import { wxLogin, wxGetUserInfo, wxAuthorize, wxRequestFn, wxGetSetting } from '@/service/wxService';

export default {
  data () {
    return {
      course_list: [
        {url: 'http://www.gopep.cn/upload/images/product/xiaoxue/shuxue/shuxue_3a.png', id: 0},
        {url: 'http://www.gopep.cn/upload/images/product/xiaoxue/yuwen/yuwen_3b.jpg', id: 1},
        {url: 'http://www.gopep.cn/upload/images/product/ebook_xiaoxue/yingyu/EBPX_YY3AM_page-cover.jpg', id: 2},
        {url: 'http://www.gopep.cn/upload/images/product/xiaoxue/yuwen/yuwen_3a.png', id: 3}
      ]
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
  @import '../../../common/stylus/mixin';
  page
    page-css()
  .course

    .course-box
      float left
      margin 10px
      width 105px
      height 160px
      justify-items center
      align-items center
      box-sizing-norm()
      background-color #fff
      box-shadow 3px 3px 4px #aaa
      img
        width 100%
        height 100%
</style>
