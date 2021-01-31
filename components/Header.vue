<template>
  <div>
    <div class="header">
      <div class="curArea">
        当前所在地:{{ curArea }} 现有确诊:{{ curConfirm }} 新增确诊:{{
          compareyesArea
        }}
      </div>
      <div class="curCountry">
        全国: 现有确诊:{{ countryConfirm }} 较昨日:{{ compareyesCountry }}
      </div>
      <div class="tips">
        <div v-if="isIndex">当前在首页</div>
        <div v-else>返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import { currentAreaCityData, currentAreaProvinceData } from "../utils/index";
export default {
  props: {
    isIndex: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      curArea: "-------",
      curConfirm: "--",
      compareyesArea: "--",
      countryConfirm: "-",
      compareyesCountry: "-",
    };
  },
  mounted() {
    let { currentArea } = this.$store.state;
    console.log(currentArea);
    if (currentArea.province) {
      this.currentArea(currentArea.province, currentArea.city);
    }
    this.getChina();
  },
  computed: {
    listencurrentArea() {
      return this.$store.state.currentArea;
    },
  },
  watch: {
    listencurrentArea: {
      deep: true,
      handler: function (newval) {
        console.log(newval.province);

        this.currentArea(newval.province, newval.city);
      },
    },
  },
  methods: {
    getChina() {
      this.countryConfirm = this.$store.state.chinaTotal.nowConfirm;
      this.compareyesCountry = this.$store.state.chinaAdd.confirm;
    },
    async currentArea(province, city) {
      this.curArea = province + city;
      let state = this.$store.state;
      let res;
      if (!city) {
        res = await currentAreaProvinceData(state.areaTree, province);
      } else {
        res = await currentAreaCityData(state, province, city);
      }
      this.curConfirm = res.total.nowConfirm;
      this.compareyesArea = res.today.confirm;
    },
  },
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
}
.curCountry {
  flex: 1;
  text-align: center;
}
.curArea {
  width: 30%;
  text-align: left;
}
.tips {
  width: 30%;
  text-align: right;
}
</style>