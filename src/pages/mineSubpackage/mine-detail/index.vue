<template>
  <div class="mine-detail">
    <ul class="detail-content padding-left-right-15px">
      <li>
        <div class="detail-left">头像</div>
        <div class="detail-right">
          <img class="avatar" :src="options.avatar_url" />
        </div>
      </li>
      <li>
        <div class="detail-left">昵称</div>
        <div class="detail-right">
          {{options.nickname}}
        </div>
      </li>
      <li>
        <div class="detail-left">性别</div>
        <div class="detail-right">
          {{options.sex}}
        </div>
      </li>
      <li>
        <div class="detail-left">角色</div>
        <div class="detail-right">
          {{options.role}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { wxGetStorage } from '@/service/wxService';
  export default {
    data() {
      return {
        userInfo: {},
        options: {
          avatar_url: 'https://avatars0.githubusercontent.com/u/5128154?v=3&s=120',
          nickname: '哈哈哥',
          sex: '男',
          role: '家长'
        }
      }
    },
    created() {
      // 获取缓存的用户信息
      wxGetStorage({key: 'userInfo'}).then((res) => {
        // console.log(res)
        this.options.avatar_url = res.data.avatarUrl;
        this.options.nickname = res.data.nickName;
      });
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import '../../../common/stylus/mixin';
  page {
    page-css();
  }
  .mine-detail {
    .detail-content {
      background-color: #fff;
      >li{
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 14px;
        div{
          -webkit-flex: 1;
          flex: 1;
        }
        .detail-left{
          display: flex;
          align-items: center;
        }
        .detail-right{
          text-align: right;
        }
        .avatar{
          width:28px;
          height:28px;
        }
      }
      >li:not(:last-child){
        border-1px(rgba(7,17,27,0.1));
      }
    }
  }
</style>
