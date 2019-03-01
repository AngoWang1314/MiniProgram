
<template>
  <div>
    <wxParse :content="article" @preview="preview" @navigate="navigate" />
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse';


export default {
  props: ['article'],
  data () {
    return {

    }
  },

  components: {
    wxParse
  },

  methods: {
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    }
  }
}
</script>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");

</style>
