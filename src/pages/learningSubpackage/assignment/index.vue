<template>
  <div class="task">
    <h2 class="task-title">我的作业</h2>
    <div class="task-list">
      <div class="task-flex">
        <navigator class="task-flex-item" url="../task-list/main" v-for="task in tasks" :key="task.name">
          <van-badge v-if="task.unfinished.length <= 0 || task.unfinished == 0" :title="task.name" />
          <van-badge v-else :title="task.name" :info="task.unfinished" />
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>
import { wxLogin, wxGetUserInfo, wxAuthorize, wxRequestFn, wxGetSetting } from '@/service/wxService';

export default {
  data () {
    return {
      tasks: [
        {name: '数学', unfinished: 10},
        {name: '政治思想', unfinished: 1},
        {name: '历史', unfinished: 0},
        {name: '英语', unfinished: 5},
        {name: '物理', unfinished: 9}
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
  .task
    .task-title
      text-align center
      line-height 48px
      color #555
      font-size-16px()
    .task-list
      text-align center
      font-size-16px()
      box-shadow 0 0 8px #aaa
      .task-flex
        display -webkit-flex
        display flex
        flex-wrap wrap
        line-height 60px
        color #666
        .van-badge
          background-color transparent
        .task-flex-item
          position relative
          width 50%
          flex 0 0 50%
          border-bottom 1px solid #ccc
          box-sizing border-box
          background-color #fff
          &:nth-child(odd)::after
            position absolute
            top 0
            right 0
            content ''
            display block
            height 100%
            width 0
            border-right 1px solid #ccc

</style>
