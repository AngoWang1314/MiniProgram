<template>
  <div class="no-more">
    <div class="message">{{promptMessage}}</div>
  </div>
</template>

<script>
  export default {
    props: {
       promptMessage: {
        type: String,
        default() {
          return '————暂无更多信息————';
        }
      }
    },

  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/mixin';
  .no-more
    .message
      line-height 48px
      color #999
      text-align center
      font-size-16px()
</style>
