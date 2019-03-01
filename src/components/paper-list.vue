<template>
  <div class="paper-list">
      <van-cell v-for="(content, idx) in paperList" :key="idx" :title="content.name" :label="content.exam_type+'         '+content.grade" is-link :url="url + '?paper_id='+content.exam_id"/>
  </div>
</template>

<script>
  export default {
    props: ['paperList'],
    data() {
      return {
        url: '../paper-content/main'
      }
    },
    created() {
      // console.log('navigation',this.list);
      // console.log('这是试卷列表组件',this.paperList)
    }
  }
</script>

<style lang="stylus">
@import '../common/stylus/mixin';

</style>
