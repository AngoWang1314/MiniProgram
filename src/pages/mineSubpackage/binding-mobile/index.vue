<template>
  <div class="binding-mobile">
    <ul class="mobile-message">
      <li class="padding-left-right-15px">
        <div class="icon mobile"></div>
        <div class="content">
          <input type="number" v-model="cellPhoneNumber" placeholder="请输入您的手机号" maxlength="11" />
        </div>
      </li>
      <li class="padding-left-right-15px">
        <div class="icon verification-code"></div>
        <div class="content">
          <input type="number" placeholder="请输入验证码" />
        </div>
        <div class="button" :class="{'no-can-get': !getVCode}" @click="getVerificationCode()">获取验证码<span v-show="countDown.start">({{countDown.time}}s)</span></div>
      </li>
    </ul>
    <p class="hint padding-left-right-15px">请输入手机号进行绑定</p>
    <div class="button-quit">
      <button type="button" class="quit">绑  定</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mobileHint: {
          berfore: '请输入手机号进行绑定',
          afterMobileError: '手机号有误，请重新输入',
          afterCodeError: '验证失败，请稍后重试'
        },
        cellPhoneNumber: '',
        getVCode: true,
        countDown: {
          start: false,
          time: 30
        },  //  倒计时
        mobileRight: false
      }
    },
    created() {

    },
    computed: {

    },
    methods: {

      // 获取验证码
      getVerificationCode() {

        if (!this.getVCode) {
          return;
        }
        // 手机号正则验证
        let can_get = /^((13)|(15)|(17)|(18))[0-9]{9}$/g.test(this.cellPhoneNumber);
        console.log(this.cellPhoneNumber);
        if (can_get) {
          console.log('获取验证码');
          // 成功获取验证码后getVCode设为false待时间间隔到期后才可以再次获取
          this.getVCode = false;
        }else{
          console.log('手机输入错误');
        }
      }
    },
    watch: {
      getVCode(newValue) {
        if (!newValue) {
          this.countDown.start = true;
          var timer = setInterval(() => {
            this.countDown.time--;
            if (this.countDown.time <= 0) {
              this.getVCode = true;
              clearInterval(timer);
            }
          },1000);
        }else{
          clearInterval(timer);
          this.countDown.start = false;
          this.countDown.time = 30;
        }
      }
    }

  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import '../../../common/stylus/mixin';
  page{
    page-css()
  }
  .binding-mobile{
    .mobile-message{
      background-color: #fff;
      li{
        display: flex;
        height: 40px;
        line-height: 40px;
        .content{
          -webkit-flex: 1;
          flex: 1;
          input{
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 10px;
            height: 100%;
            color: #666;
            font-size: 14px;
            box-sizing-norm()
          }
        }
        .icon{
          width: 28px;
          flex: 0 0 28px;
        }
        .button{
          margin-top: 10px;
          margin-bottom: 10px;
          width: 90px;
          line-height: 20px;
          font-size: 13px;
          text-align: right;
          color: #999;
          border-left: 1px solid #ccc;
          &.no-can-get{
            color: #ccc;
          }
          span{
            color: #999;
            font-size: 10px;
          }
        }
        .mobile{
          background: url(../../../../static/icon/mobile.png) no-repeat center center;
          background-size: 25px 25px;
        }
        .verification-code{
          background: url(../../../../static/icon/verification_code.png) no-repeat center center;
          background-size: 25px 25px;
        }
      }
      li:not(:last-child){
        border-1px(rgba(7,17,27,0.1));
      }
    }
    .hint{
      font-size: 11px;
      color: #666;
    }
    .button-quit{
      margin-top: 20px;
      .quit{
        appearance: none;
        // letter-spacing: 20px;
        height: 50px;
        width:300px;
        line-height: 50px;
        color: #fff;
        background: -webkit-linear-gradient(#41a1ef,#0080e8);
        background: -moz-linear-gradient(#41a1ef,#0080e8);
        background: -o-linear-gradient(#41a1ef,#0080e8);
        background: linear-gradient(#41a1ef,#0080e8);
        border: none;
        border-radius: 25px;
        box-shadow: 0 2px  10px #2196f3;
        // &.button-hover{
        //   background-color: #108ff5;
        // }
      }
    }
  }

</style>
