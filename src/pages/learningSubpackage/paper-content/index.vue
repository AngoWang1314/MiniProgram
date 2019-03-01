
<template>
  <div>
    <web-view :src="webview_url"></web-view>
  </div>
</template>

<script>
import { cookieCheck, wvPaperId } from '@/utils/index';
export default {

  data () {
    return {
      paper_id: '',
      webview_url: ''
    }
  },

  components: {

  },
  mounted() {
    this.paper_id = this.$mp.query.paper_id;
    this.webview_url = `http://localhost:8189/#/home?version=${new Date().valueOf()}&${cookieCheck.name}=${cookieCheck.value}&paper_id=${this.paper_id}`;
    console.log(this.paper_id,this.webview_url);
  },

  created () {

  },

  methods: {

  },
  watch: {

  }
}
</script>

<style>

</style>
