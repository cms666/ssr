<template>
  <div class="header">
    <div class="curArea">
      当前所在地:{{ curArea }} 现有确诊:{{ curConfirm }} 较昨日:{{
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
</template>

<script>
import { currentAreaCityData } from "../utils/index";
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
  async mounted() {
    this.getChina();
    await this.getcurArea();
  },
  methods: {
    getChina() {
      this.countryConfirm = this.$store.state.chinaTotal.nowConfirm;
      this.compareyesCountry =
        this.$store.state.chinaAdd.confirm - this.$store.state.chinaAdd.heal;
    },
    currentArea() {
      let data = this.$store.state.currentArea;
      console.log(data.province, data.city);
      let state = this.$store.state;
      currentAreaCityData(state, data.province, data.city).then((res) => {
        console.log(res);
        this.curConfirm = res.total.nowConfirm;
        this.compareyesArea = res.today.confirm;
        
      });
    },
    getcurArea() {
      let that = this;
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function (res) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            console.log(res.address);
            that.curArea = res.address.province + res.address.city;
            that.$store.commit("addArea", {
              province: res.address.province.slice(0, -1),
              city: res.address.city.slice(0, -1),
            });
            that.currentArea();
          } else {
          }
        },
        { enableHighAccuracy: true }
      ); //enableHighAccuracy：是否要求浏览器获取最佳效果，默认为false
    },
  },
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>