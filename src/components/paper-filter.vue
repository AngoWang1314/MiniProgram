<template>
  <div class="paper-filter">
    <div class="paper-type">
      <h6 class="filter-title">试卷类型</h6>
      <div class="paper-type-item clearfix">
        <span class="filter-item" v-for="item in paper_type" :key="item.id" :class="{active:item.id === paperFilter.type_id}" @click="selectPaperType(item.id)">{{item.name}}</span>
      </div>
    </div>
    <div class="paper-year">
      <h6 class="filter-title">试卷年份</h6>
      <div class="paper-year-item clearfix">
        <span class="filter-item" v-for="item in paper_year" :key="item" :class="{active:item === paperFilter.year}" @click="selectPaperYear(item)">{{item}}</span>
      </div>
    </div>
    <div class="paper-area">
      <h6 class="filter-title">试卷地区</h6>
      <div class="paper-area-item">
        <van-cell
          :title="province.name"
          is-link
          arrow-direction="down"
          @click="selectProvince"
        />
        <van-cell
          v-if="province.id !== 9999 && province.id != null"
          :title="city.name"
          is-link
          arrow-direction="down"
          @click="selectCity"
        />
        <van-cell
          v-if="province.id !== 9999  && city.id != null"
          :title="area.name"
          is-link
          arrow-direction="down"
          @click="selectArea"
        />
      </div>
    </div>
    <div class="paper-level">
      <h6 class="filter-title">难易度</h6>
      <div class="paper-level-item clearfix">
        <span class="filter-item" v-for="item in paper_level" :key="item.id" :class="{active:item.level === paperFilter.level}" @click="selectPaperLevel(item.level)">{{item.name}}</span>
      </div>
    </div>

    <div class="reset-and-sure">
      <van-button class="reset" @click="resetCondition" size="small" :loading="reset" type="default">重置</van-button>
      <van-button class="sure" @click="sureGetFilterMessage" size="small" :loading="sure" type="primary">确认</van-button>
    </div>

    <!-- 试卷地区选择 -->
    <van-popup
      :show="picker_show"
      position="bottom"
      @close="onClose"
      :overlay="true"
      custom-style="width:100%;"
    >
      <van-picker
        show-toolbar
        :columns="region === 'province' ? province_columns : region === 'city' ? city_columns : area_columns"
        @cancel="onCancelPicker"
        @confirm="onConfirmPicker"
        value-key="name"
      />
    </van-popup>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from'vuex';
  import { getPaperFilter } from '@/service/paperFilter';
  import { wxRequestFn } from '@/service/wxService';

  export default {
    name: 'PaperFilter',
    props: {
      // picker_show: {
      //   type: Boolean,
      //   default() {
      //     return false;
      //   }
      // }
    },
    data() {
      return {
        paper_type: [], //  试卷类型
        paper_year: [], //  年份
        paper_level: [],  //  难易等级
        picker_show: false,
        reset: false,   // 是否正在重置
        sure: false,  //  是否正在确认
        city_columns: [],  // picker展示的市或区
        area_columns: [],  // picker展示的区
        province_columns: [{"id":1,"name":"北京市"},{"id":20,"name":"天津市"},{"id":39,"name":"河北省"},{"id":234,"name":"山西省"},{"id":376,"name":"内蒙古自治区"},{"id":499,"name":"辽宁省"},{"id":628,"name":"吉林省"},{"id":706,"name":"黑龙江省"},{"id":860,"name":"上海市"},{"id":880,"name":"江苏省"},{"id":1011,"name":"浙江省"},{"id":1124,"name":"安徽省"},{"id":1262,"name":"福建省"},{"id":1366,"name":"江西省"},{"id":1489,"name":"山东省"},{"id":1664,"name":"河南省"},{"id":1859,"name":"湖北省"},{"id":1989,"name":"湖南省"},{"id":2139,"name":"广东省"},{"id":2301,"name":"广西壮族自治区"},{"id":2439,"name":"海南省"},{"id":2468,"name":"重庆市"},{"id":2509,"name":"四川省"},{"id":2730,"name":"贵州省"},{"id":2833,"name":"云南省"},{"id":2987,"name":"西藏自治区"},{"id":3069,"name":"陕西省"},{"id":3197,"name":"甘肃省"},{"id":3310,"name":"青海省"},{"id":3363,"name":"宁夏回族自治区"},{"id":3396,"name":"新疆维吾尔自治区"},{"id":3512,"name":"香港特别行政区"},{"id":3515,"name":"澳门特别行政区"},{"id":3518,"name":"台湾省"},{"id":9999,"name":"全国"}],  //  省级展示
        region: 'province', // province：省；city：市；area：区
        province: {
          name: '请选择省',
          id: null
        },
        city: {
          name: '请选择市',
          id: null
        },
        area: {
          name: '请选择区',
          id: null
        },
      }
    },

    computed: {
      ...mapGetters([
        'paperFilter'
      ])
    },

    mounted() {
      getPaperFilter().then((res) => {
        if(res.errMsg === 'request:ok'){
          this.paper_type = res.data.types;
          this.paper_year = res.data.year;
          this.paper_level = res.data.difficulty_level;
        }
      }).catch((er) => {
        console.log(er);
      })
    },

    methods: {
      ...mapActions([
        'paperListFilter'
      ]),
      selectPaperType(id) {
        var obj = {};
        if(this.paperFilter.type_id === id) {
          obj.type_id = '';
        }else{
          obj.type_id = id;
        }
        this.paperListFilter({
          options: obj
        });
      },

      selectPaperYear(year) {
        var obj = {};
        if(this.paperFilter.year === year) {
          obj.year = '';
        }else{
          obj.year = year;
        }
        this.paperListFilter({
          options: obj
        });
      },

      selectPaperLevel(level) {
        var obj = {};
        if(this.paperFilter.level === level) {
          obj.level = '';
        }else{
          obj.level = level;
        }
        this.paperListFilter({
          options: obj
        });
      },

      selectProvince() {
        this.region = 'province';
        this.picker_show = true;
        console.log(this.city.id == null,this.area.id == null)
      },

      selectCity() {
        this.region = 'city';
        this.picker_show = true;
      },

      selectArea() {
        this.region = 'area';
        this.picker_show = true;
      },

      onClose() {
        this.picker_show = false;
      },

      // 地区选择取消
      onCancelPicker(event) {
        this.onClose();
      },

      // 地区选择确认
      onConfirmPicker(event) {
        var obj = {};
        if(this.region === 'province') {

          this.province.id = obj.province_id = event.mp.detail.value.id;
          this.province.name = event.mp.detail.value.name;

          this.city.name = '请选择市';
          this.city.id = null;
          this.area.name = '请选择区';
          this.area.id = null;

          wxRequestFn({
            url:`http://cms.dev.dtedu.com/qlib/common/region?province_id=${obj.province_id}`
          }).then((res) => {
            // console.log(res);
            this.city_columns = Object.values(res.data.data.city);
          });

        }else if(this.region === 'city') {

          this.city.id = obj.city_id = event.mp.detail.value.id;
          this.city.name = event.mp.detail.value.name;

          this.area.name = '请选择区';
          this.area.id = null;

          wxRequestFn({
            url:`http://cms.dev.dtedu.com/qlib/common/region?province_id=${this.province.id}&city_id=${obj.city_id}`
          }).then((res) => {
            // console.log(res);
            this.area_columns = Object.values(res.data.data.area);
          });

        }else{
          this.area.id = obj.area_id = event.mp.detail.value.id;
          this.area.name = event.mp.detail.value.name;
        }
        this.paperListFilter({
          options: obj
        });console.log(this.province.id)
        this.onClose();
      },

      resetCondition() {
        if(this.sure) {
          return;
        }
        this.reset = true;
        // 重置过滤条件
        this.paperListFilter({
          options: {},
          reset: true
        });

        this.city_columns = [];
        this.area_columns = [];
        this.province.name = '请选择省';
        this.province.id = null;
        this.city.name = '请选择市';
        this.city.id = null;
        this.area.name = '请选择区';
        this.area.id = null;
        this.reset = false;
      },

      sureGetFilterMessage() {
        if(this.reset) {
          return;
        }
        this.sure = true;
        this.$parent.popup_show = false;

        let str = '';
        for (let key in this.paperFilter) {
          str += `${key}=${this.paperFilter[key]}&`
        }

        var url = this.$parent.paper_list_url + `?${str}`;
        this.$parent.requestPaperList({url:url});
        this.$nextTick(() => {
          this.sure = false;
        });
      },

    },

    watch: {

    }
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/mixin';
  @import '../common/stylus/base';

  .paper-filter
    .paper-type-item,
    .paper-year-item,
    .paper-level-item,
    .paper-area-item
      padding-left 15px
      padding-right 15px
    .filter-title
      padding-left 15px
      line-height 28px
      color #999
      font-size-14px()
      border-1px(rgba(7,17,27,0.1))
    .filter-item
      float left
      padding 3px 8px
      margin 2px 5px
      color #666
      font-size-14px()
      &.active
        color #fff
        background-color #3a9dff
    .reset-and-sure
      margin-top 30px
      text-align right
      .reset
        margin-right 30px
      .sure
        margin-right 15px

</style>
