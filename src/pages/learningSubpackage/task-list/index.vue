<template>
  <div class="task-list">
    <van-tabs active="0" custom-class="top-fixed" @change="onChange" fixed animated swipeable sticky offset-to="0px" :scroll-top="scrollTop">
      <van-tab title="全部">
        <div class="task-list-box" :style="{height:box_height}"><v-task-list :taskList="allTask"></v-task-list></div>
      </van-tab>
      <van-tab title="批阅中">
        <div class="task-list-box" :style="{height:box_height}"><v-task-list :taskList="reviewing"></v-task-list></div>
      </van-tab>
      <van-tab title="已完成">
        <div class="task-list-box" :style="{height:box_height}"><v-task-list :taskList="finished"></v-task-list></div>
      </van-tab>
      <van-tab title="未完成">
        <div class="task-list-box" :style="{height:box_height}"><v-task-list :taskList="unfinished"></v-task-list></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { wxSystemInfo, wxRequestFn } from '@/service/wxService';
import taskList from '@/components/task-list';

export default {
  data () {
    return {
      allTask:[
        {create_time: '2018-12-29', deadline: '2018-12-31', finish_time: '2018-12-29', status: '已完成',id:1},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '批阅中',id:2},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:3},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:4},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:5},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '未完成',id:6},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:7},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '未完成',id:8},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:9},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '未完成',id:10},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:11},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '未完成',id:6},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:7},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '未完成',id:8},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:9},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '未完成',id:10},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '已完成',id:11},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '未完成',id:12},
        {create_time: '2018-12-29', deadline: '2018-12-30', finish_time: '2018-12-29', status: '未完成',id:13}
      ],
      reviewing: [],
      finished: [],
      unfinished: [],
      box_height: 'auto'
    }
  },

  components: {
    'v-task-list': taskList
  },

  mounted() {
    wxSystemInfo().then((res) => {
      this.box_height = res.windowHeight - 44 + 'px';
    });
  },

  methods: {
    onChange(event) {
      var title = event.mp.detail.title;

      if(title === '全部') {
        this.allTask = this.getTaskList('全部');
      }else if(title === '批阅中') {
        this.reviewing = this.getTaskList('批阅中');
      }else if(title === '已完成') {
        this.finished = this.getTaskList('已完成');
      }else if(title === '未完成') {
        this.unfinished = this.getTaskList('未完成');
      }
    },
    getTaskList(filter) {
      if (filter === '全部') {
        return this.allTask;
      }
      return this.allTask.filter((value) => {return value.status === filter});
    }
  },

  created () {
    // console.log(taskList)
  },
  watch: {

  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../../common/stylus/mixin';
  page
    page-css()
    .task-list
      .top-fixed
        .van-tabs__wrap
          position fixed
      .task-list-box
        overflow auto
</style>
