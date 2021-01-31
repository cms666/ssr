<template>
  <div class="index">
    <div class="header1">
      <Header />
    </div>
    <div class="classify">
      <Classify />
    </div>
    <div class="picture">
      <div class="leftDetail"><Detail /></div>
      <div class="item"><Picture /></div>
      <div class="rightNews">
        <div class="news"><News /></div>
      </div>
    </div>

    <!-- {{ data }} -->
  </div>
</template>

<script>
import axios from "axios";
import { getcurArea } from "../utils/index";
export default {
  mounted() {
    console.log(localStorage.getItem("currentArea"));
    if (!localStorage.getItem("currentArea")) {
      this.getcurArea();
    } else {
      this.getLocalItem();
    }
    this.getnews();
  },
  /*   created(){
 this.init();
  }, */
  methods: {
    async getcurArea() {
      let res = await getcurArea();
      console.log(res);
      this.$store.commit("addArea", {
        province: res.address.province.slice(0, -1),
        city: res.address.city.slice(0, -1),
      });
      if (!this.$store.state.selected) {
        this.$store.commit("updateSelected", res.address.province.slice(0, -1));
      }
    },
    getLocalItem() {
      let area = JSON.parse(localStorage.getItem("currentArea"));
      // console.log(area.province);
      // console.log(this.$store.state.currentArea);

      this.$store.commit("addArea", {
        province: area.province,
        city: area.city,
      });
      if (!this.$store.state.selected) {
        this.$store.commit("updateSelected", area.province);
      }
      localStorage.removeItem("currentArea");
      // console.log(this.$store.state.currentArea);
    },
    async getnews() {
      let { data } = await axios.get(
        "http://49.232.173.220:3001/data/getTimelineService"
      );
      // console.log(data);
      let filter = data.filter((item) => item.summary !== "").slice(0, 100);
      this.$store.commit("addnews", filter);
      console.log(this.$store.state.news);
    },
  },
  async asyncData({ store, $axios }) {
    if (!store.state.areaTree.size) {
      let { data } = await $axios.$get("/getOnsInfo?name=disease_h5");
      let obj = eval("(" + data + ")");
      let { lastUpdateTime, chinaAdd, chinaTotal, areaTree } = obj;
      console.log(obj, areaTree[0]);
      store.commit("addTree", areaTree[0]);
      store.commit("addlastUpdateTime", lastUpdateTime);
      store.commit("addchinaTotal", chinaTotal);
      store.commit("addchinaAdd", chinaAdd);
    }
  },
};
</script>

<style>
.classify,
.picture,
.header1 {
  margin-top: 10px;
  position: relative;
}
.leftDetail {
  position: absolute;
  top: 40%;
  left: 15%;
  z-index: 99;
  background-color: #fff;
}
.rightNews {
  position: absolute;
  top: 30%;
  right: 10%;
}
.index {
  box-sizing: border-box;
  padding: 0 5%;
}
.picture {
  display: flex;
}
.item {
  flex: 1;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
