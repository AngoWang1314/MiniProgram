<template>
  <div class="rating">
    <div class="rating-textarea">
      <textarea class="rating-write" placeholder="请输入你的看法" placeholder-class="rating-write"></textarea>
      <button plain="true" class="rating-send">发送</button>
    </div>
    <div class="all-box">
      <span class="all-rating" @click="ratingListShow = true">全部评论</span>
    </div>
    <div name="fade">
      <div class="rating-list" :class="{active: ratingListShow}">
        <div class="list-header padding-left-right-15px">
          全部评论
          <span @click="ratingListShow = false">收起</span>
        </div>
        <div class="list-box" :style="{height:ratingListHeight}">
          <ul>
            <li v-for="(item, index) in list" :key="index" class="list padding-left-right-15px">
              <p class="content">{{item.content}}</p>
              <span class="author">{{item.author}}</span>
              <span class="time">{{item.time}}</span>
            </li>
          </ul>
          <div class="no-more" v-show="listTotlePage === listCurrentPage || listCurrentPage === 0">
            暂无更多...
          </div>
          <div class="load-more" @click="loadMore" v-show="listCurrentPage < listTotlePage && listCurrentPage != 0">
            <button plain="false" :loading="loading">{{loading ? '正在加载' : '加载更多'}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { wxSystemInfo, wxRequestFn } from '@/service/wxService';

  export default {
    data() {
      return {
        ratingListHeight: 0,
        ratingListShow: false,
        list: [
          {
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          },{
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          },{
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          },{
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          },{
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          },{
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          },{
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          },{
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          },{
            content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
            author: '作者',
            time: '2018-11-11'
          }
        ],
        listTotlePage: 1,
        listCurrentPage: 1,
        loading: false,
        animationData: ''
      }
    },
    created() {
      // 获取视口高度，计算评论列表的高度
      wxSystemInfo().then((res) => {
        const h = res.windowHeight - 225 - 36 - 40;
        this.ratingListHeight = `${h}px`;
      });
    },
    methods: {
      animation(y) {
        const wxAnimation = wx.createAnimation({duration: 400});
        wxAnimation.translate3d(0,y,0);
        return wxAnimation;
      },
      loadMore() {
        if(this.loading === true) {
          return;
        }
        this.loading = true;
        // let getMoreRating = wxRequestFn({

        // }).then((res) => {
        //   console.log(res)
        // })

        // 一定时间后未成功则取消请求，重置状态
        let timer = setTimeout(() => {
          if(this.loading === true) {
            // getMoreRating.abort();
            this.loading = false;
          }
        },20000);
      }
    },
    watch: {
      ratingListShow(newValue) {
        if(newValue){
          this.animationData = this.animation('0').export();
        }else{
          this.animationData = this.animation('100%').export();
        }
      }
    }
  }
</script>

<style lang="stylus">
@import '../common/stylus/mixin';

  .rating
    margin-bottom 20px
    padding-top 10px
    padding-bottom 10px
    .all-box
      text-align right
    .all-rating
      font-size 14px
      color #3aa03a
    .rating-textarea
      display flex
      .rating-write
        flex 1
        margin-right 10px
        height 24px
        line-height 24px
        font-size 14px
        border: 1px solid #eee
      .rating-send
        padding 0
        flex 0 0 60px
        width 60px
        height 24px
        line-height 24px
        font-size 14px
        border none
    .rating-list
      position fixed
      bottom 0
      left 0
      width 100%
      background-color #ffffff
      z-index 99
      overflow hidden
      transform translate3d(0,100%,0)
      transition 0.4s all
      &.active
        transform translate3d(0,0,0)
        transition 0.4s all
      t
      .list-header
        float left
        width 100%
        margin-top 10px
        margin-bottom 10px
        font-size 14px
        span
          float right
          color #46d846
      .list-box
        margin-top 40px
        overflow auto
      .list
        padding-top 5px
        padding-bottom 5px
        font-size 0
        border-1px(rgba(7,17,27,0.1))
        // box-shadow 0 2px 5px #f4f4f4
        .content
          font-size 14px
        .author, .time
          font-size 12px
          color #999
        .time
          float right
      .no-more, .load-more
        line-height 40px
        color #666666
        font-size 16px
        text-align center
      .load-more
        button
          line-height 40px
          color #666666
          font-size 16px
          border none
</style>
