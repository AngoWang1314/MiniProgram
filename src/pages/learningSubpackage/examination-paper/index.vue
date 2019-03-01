<template>
  <div class="leaning">
    <van-tabs active="0" custom-class="top-fixed" @change="onChange" animated swipeable sticky offset-to="0px" :scroll-top="scrollTop">
      <van-tab v-for="(item, index) in subject" :key="index" :title="item.title">
        <!--active_index不为0时 不可缺 缺少则tab状态不对 -->
        <!-- <span class="van-tab-hack"></span> -->
        <div class="paper-list-box" :style="{height:box_height}">
          <v-paper-list v-if="item.id === subject[0].id" :paperList="yuwenList"></v-paper-list>
          <v-paper-list v-if="item.id === subject[1].id" :paperList="shuxueList"></v-paper-list>
          <v-paper-list v-if="item.id === subject[2].id" :paperList="yingyuList"></v-paper-list>
          <v-paper-list v-if="item.id === subject[3].id" :paperList="wuliList"></v-paper-list>
          <v-paper-list v-if="item.id === subject[4].id" :paperList="huaxueList"></v-paper-list>
          <v-paper-list v-if="item.id === subject[5].id" :paperList="shengwuList"></v-paper-list>
          <v-pagination @pageChange="pageChange" v-if="index === active_index" :pageCount="page_count"></v-pagination>
          <v-no-more v-if="page_count === 0"></v-no-more>
        </div>
      </van-tab>
    </van-tabs>
    <div class="filter" @click="popup_show = true">筛选<van-icon name="wap-nav" size="10px" /></div>

    <!-- 筛选 -->
    <van-popup
      :show="popup_show"
      position="right"
      @close="onClose"
      custom-style="height:100%;width:80%;"
    >
      <!-- <div class="popup-content"></div> -->
      <v-paper-filter></v-paper-filter>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { wxRequestFn, wxPageScrollTo, wxSystemInfo } from '@/service/wxService';

import paperList from '@/components/paper-list';
import paperFilter from '@/components/paper-filter';
import pagination from '@/components/pagination';
import noMore from '@/components/no-more';

export default {
  data () {
    return {
      paper_list_url: 'http://cms.dev.dtedu.com/qlib/exampaper/list',
      scrollTop: '0px',
      active_index: 0,  //  从0开始，若不为0，则tab内容初始状态有误
      subject: [
        {
          title: '语文',
          id: 2
        },
        {
          title: '数学',
          id: 3
        },{
          title: '英语',
          id: 4
        },
        {
          title: '物理',
          id: 5
        },
        {
          title: '化学',
          id:6
        },
        {
          title: '生物',
          id: 10
        }
      ],
      box_height: 'auto',  //  试卷list盒子高度
      popup_show: false,
      page_count: 0
    }
  },

  computed: {
    ...mapGetters([
      'yuwenList',
      'shuxueList',
      'yingyuList',
      'wuliList',
      'huaxueList',
      'shengwuList',
      'paperFilter'
    ])
  },

  components: {
    'v-paper-list': paperList,
    'v-paper-filter': paperFilter,
    'v-pagination': pagination,
    'v-no-more': noMore
  },

  methods: {

    // tab选项卡切换
    onChange(event) {
      let active_index = event.mp.detail.index;

      this.active_index = active_index;

      this.current_subject_id = this.subject[active_index].id;
      this.requestPaperList();

      // 重置过滤条件
      this.paperListFilter({
        options: {},
        reset: true
      });
    },

    //
    requestPaperList(params) {
      var params = params ? params : {};

      wx.showLoading({
        title: '加载中',
      });

      wxRequestFn({
        url: params.url || this.paper_list_url,
        method: 'GET',
        data: {
          page: params.page || 1,  //  页码
          per_page: params.per_page || 10,   // 一页数量
          subject_id: this.current_subject_id   //学科id
        }
      }).then((res) => {
        // console.log(res);
        // ?promise 无效？？
        wxPageScrollTo({
          scrollTop: 0,
          duration: 0
        });

        var p_c = res.data.data.total_count / 10;
        if (res.data.data.total_count % 10 === 0) {
          this.page_count = p_c;
        }else {
          this.page_count = parseInt(p_c) + 1;
        }

        return this.getPaperList({
          list: res.data.data.items,
          id: this.current_subject_id
        }).then((res) => {
          wx.hideLoading();
        });

        // console.log(this);
      }).catch((er) => {
        // console.log(er);
      });
    },

    // 蒙层关闭时触发
    onClose() {
      this.popup_show = false;
    },

    // 分页切换
    pageChange(pageValue) {
      // console.log(`现在是第${pageValue}页`);
      let str = '';
      for (let key in this.paperFilter) {
        str += `${key}=${this.paperFilter[key]}&`
      }

      var url = this.paper_list_url + `?${str}`;
      this.requestPaperList({url: url, page: pageValue});
    },

    // 映射actions里的方法
    ...mapActions([
      'getPaperList',
      'paperListFilter'
    ])
  },

  mounted() {
    this.current_subject_id = this.subject[this.active_index].id;
    this.requestPaperList();
    wxSystemInfo().then((res) => {
      this.box_height = res.windowHeight - 44 + 'px';
      // console.log(res);
    });
  },
  watch: {

  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../../common/stylus/mixin';
  page
    page-css()
  .leaning
    .top-fixed
      .van-tabs__wrap
        position fixed
        padding-right 48px
        background-color #fff
      .van-tab-hack
        display block
        width 100%
        height 1px
        transform scaleY(0.1)
        z-index -1
      .paper-list-box
        overflow auto
    .filter
      position fixed
      top 1px
      right 0
      width 48px
      height 42px
      line-height 42px
      text-align center
      font-size-12px()
      background-color #fff
      z-index 99
    .popup-content
      width 50%
      height 100%
      background-color #fff
</style>
