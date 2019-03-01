<template>
  <div>
    <!--
      属性名                     类型     默认值       说明
      initial-time              Number               指定视频位置
      duration                  Number               指定视频时长
      controls                  Boolean   true       是否显示默认控件
      autoplay                  Boolean   false      是否自动播放
      loop                      Boolean   false      是否循环播放
      show-fullscreen-btn       Boolean   true       是否显示全屏按钮
      show-play-btn             Boolean   true       是否显示视频底部控制栏的播放按钮
      show-center-play-btn      Boolean   true       是否显示视频中间的播放按钮
      bindplay	                EventHandle		       当开始/继续播放时触发play事件
      bindpause	                EventHandle		       当暂停播放时触发 pause 事件
      bindended	                EventHandle		       当播放到末尾时触发 ended 事件
      bindtimeupdate	          EventHandle		       播放进度变化时触发，触发频率 250ms 一次
      bindfullscreenchange	    EventHandle		       视频进入和退出全屏时触发
      bindwaiting	              EventHandle		       视频出现缓冲时触发
      binderror	                EventHandle		       视频播放出错时触发
     -->
    <video id="myVideo" :src="videoUrl" controls autoplay="true"></video>
  </div>
</template>

<script>
  export default {
    props: ['videoUrl'],

    methods: {

    },
    created() {
      this.videoContext = wx.createVideoContext('myVideo')
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  #myVideo{
    width: 100%;
  }
</style>
