<template>
  <div class="navigation">
      <navigator v-for="item in list" :key="item.id" :url="item.navigate_url" open-type="navigateTo" class="navigation-child  padding-left-right-15px">
        <h4 class="title">{{item.text}}</h4>
        <div class="icon icon-right"></div>
      </navigator>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    data() {
      return {

      }
    },
    created() {
      // console.log('navigation',this.list);
    }
  }
</script>

<style lang="stylus">
@import '../common/stylus/mixin';

  .navigation{
    .navigation-child{
      display: flex;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 14px;
      .title{
        flex:1;
      }
      .icon{
        flex: 0 0 20px;
        width: 20px;
      }
    }
    .navigation-child:not(:last-child){
      border-1px(rgba(7,17,27,0.1));
      &::after{
        width:auto;
        left: 15px;
        right: 15px;
        margin-left: auto;
        margin-right: auto;
        box-sizing-norm
      }
    }
  }

</style>
