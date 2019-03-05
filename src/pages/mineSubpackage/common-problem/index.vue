<template>
  <div>
    <van-collapse :value="activeValue" @change="onChange" accordion>
      <van-collapse-item v-for="item in questions" :key="item.id" :title="item.title" :name="item.id">
        {{item.content}}
      </van-collapse-item>

    </van-collapse>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeValue: null,
        questions: [{
          id: 1,
          title: '这是一个常见问题这是一个常见问题',
          content: '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失'
        },{
          id: 2,
          title: '这是一个常见问题这是一个常见问题',
          content: '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失'
        },{
          id: 3,
          title: '这是一个常见问题这是一个常见问题',
          content: '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失'
        }]
      }
    },
    methods: {
      onChange(event) {
        this.activeValue = event.mp.detail;
      }
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import '../../../common/stylus/mixin';
  page {
    page-css()
  }

</style>
