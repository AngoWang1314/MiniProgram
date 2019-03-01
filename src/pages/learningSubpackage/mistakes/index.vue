<template>
  <div class="mistakes">
    <div class="nav-tab">
      <div>数学</div>
      <div>语文</div>
      <div>英语</div>
    </div>
  </div>
</template>

<script>
import { wxLogin, wxGetUserInfo, wxAuthorize, wxRequestFn, wxGetSetting } from '@/service/wxService';

export default {
  data () {
    return {
      motto: {
        img_url: '../../../../static/images/luxun.jpg',
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
  @import '../../../common/stylus/mixin';
  page
    page-css()


</style>
