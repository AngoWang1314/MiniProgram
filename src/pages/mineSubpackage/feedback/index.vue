<template>
  <div class="feedback">
    <h3 class="title">请留下您宝贵的建议（200字以内）</h3>
    <van-field
      :value="leaveWord"
      type="textarea"
      placeholder="请输入留言"
      maxlength="200"
      border="true"
      autosize
      input-class="leave-word"
      @change="getlLeaveWord"
    />
    <div class="submit-box">
      <van-button size="small" @click="submitLeaveWord" :loading="isLoading" loading-text="正在提交..." type="info" class="submit-btn">提  交</van-button>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        leaveWord: null,
        isLoading: false
      }
    },
    components: {

    },
    methods: {
      // 当输入文本时获取文本
      getlLeaveWord(event) {
        console.log(event)
        this.leaveWord = event.mp.detail;
      },

      // 提交
      submitLeaveWord() {

        if(this.leaveWord) {
          this.isLoading = true;
          // 模拟，2s后提示成功
          setTimeout(() => {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            });
            this.isLoading = false;
          }, 2000)

        }else{
          wx.showToast({
            title: '请填写留言',
            icon: 'none',
            duration: 2000
          })
        }

      }
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import '../../../common/stylus/mixin';
  page {
    page-css()
  }
  .feedback{
    background-color #fff
    .title{
      padding-left 15px
      padding-right 15px
      font-size 14px
      color #999
    }
    .submit-box{
      padding 15px
      text-align center
    }
    .leave-word{
      min-height 72px

    }
  }
</style>
