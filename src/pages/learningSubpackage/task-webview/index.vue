<template>
  <div>
    <web-view :src="webview_url"></web-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        webview_url: 'http://localhost:8189/#/task'
      }
    },
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">

</style>
