<template>
  <div class="task-list">
      <!-- <van-cell v-for="task in taskList" :key="task.id" :title="task.create_time" :value="task.status" :label="'预计完成时间：'+task.deadline+'实际完成时间：'+task.finish_time" is-link :url="url"> -->
        <!-- <view slot="label">
          <view class="van-cell-text">预计完成时间：{{task.deadline}}</view>
          <view class="van-cell-text">实际完成时间：{{task.finish_time}}</view>
        </view> -->
      <!-- </van-cell> -->
      <div v-for="task in taskList" :key="task.id" is-link>
        <navigator class="cell" :url="url">
          <div class="cell-title">
            <div class="cell-title-item">{{task.create_time}}</div>
            <div class="cell-title-item status">{{task.status}}</div>
          </div>
          <div class="cell-label">预计完成时间：{{task.deadline}}&nbsp;&nbsp;<span v-if="task.status !== '未完成'">实际完成时间：{{task.finish_time}}</span></div>
          <div class="cell-icon"><van-icon name="arrow"></van-icon></div>
        </navigator>
      </div>
  </div>
</template>

<script>
  export default {
    props: {
      taskList: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        url: '../learningSubpackage/task-webview/main',

      }
    },
    created() {
      console.log('navigation',this.taskList);
    }
  }
</script>

<style lang="stylus">
@import '../common/stylus/mixin';
.task-list
  .cell
    padding 10px 15px
    line-height 24px
    font-size-14px()
    border-1px(rgba(7,17,27,0.1))
    background-color #fff
    .cell-title
      display flex
      .cell-title-item
        flex 1
        &.status
          padding-right 25px
          text-align right
          color #666
    .cell-label
      line-height 18px
      color #7d7e80
      font-size-12px()
    .cell-icon
      display flex
      position absolute
      top 0
      bottom 0
      right 15px
      margin auto
      align-items center
</style>
