<template>
  <div class="pagination" v-if="pageCount >= 1">
    <div class="pagination-item" :class="{noactive: current_page === 1}">
      <span @click="prePage">上一页</span>
    </div>
    <div class="pagination-item" :class="{noactive: pageCount === 1}">
      <picker @change="pickerChange" :value="page_index" :range="page_array">
        <view class="picker">
          {{current_page}} / {{pageCount}}
        </view>
      </picker>
    </div>
    <div class="pagination-item" :class="{noactive: current_page === pageCount}">
      <span @click="nextPage">下一页</span>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      pageCount: {
        type: String || Number,
        default() {
          return 0;
        }
      }
    },
    data() {
      return {
        page_index: 0,
        current_page: 1,
      }
    },
    computed: {
      page_array() {
        var arr = [];
        for(let i = 1; i <= this.pageCount; i++) {
            arr.push(i);
        }
        return arr;
      }
    },
    methods: {
      pickerChange(event) {
        this.page_index = event.mp.detail.value;
        this.current_page = this.page_array[this.page_index];
      },
      prePage() {
        if(this.current_page === 1) {
          return;
        }
        this.current_page--;
        this.page_index--;
      },
      nextPage() {
        if(this.current_page === this.pageCount) {
          return;
        }
        this.current_page++;
        this.page_index++;
      }
    },
    watch: {
      // 页码变化时分发一个pageChange事件
      current_page(newValue) {
        this.$emit('pageChange',newValue);
      },
      // 当总页数改变时，当前页面需跳到首页
      pageCount(newValue) {
        // console.log('总页数改变')
        this.current_page = 1;
        this.page_index = 0;
      }
    }
  }
</script>

<style lang="stylus" scoped>
   @import '../common/stylus/mixin';
  .pagination
    display flex
    padding 10px 0;
    background-color #fff
    .pagination-item
      flex 1
      line-height 24px
      text-align center
      font-size-16px()
      color #3a9dff
      &.noactive
        color #787878
      .span
        padding 2px 8px
</style>
