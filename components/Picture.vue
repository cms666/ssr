<template>
  <div>
    <div id="myChart"></div>
    <div v-if="zero" class="zero">当地暂无确诊病例</div>
  </div>
</template>

<script>
import { eventBus } from "../plugins/eventBus";
import { currentAreaProvinceData } from "../utils/index";
import * as echarts from "echarts";
export default {
  data() {
    return {
      children: [],
      name: "",
      today: {},
      total: {},
      zero: false,
    };
  },
  mounted() {
    let { currentArea } = this.$store.state;
    if (currentArea.province) {
      this.controlPicture(currentArea.province);
    }
  },
  computed: {
    listenArea() {
      return this.$store.state.selected;
    },
  },
  watch: {
    listenArea: {
      handler: async function (newval) {
        this.controlPicture(newval);
      },
    },
  },
  methods: {
    async controlPicture(newval) {
      let { areaTree } = this.$store.state;
      let res,
        detail = {};
      if (newval == "全国") {
        res = areaTree;
        let { chinaTotal } = this.$store.state;
        detail.import = chinaTotal.nowConfirm - chinaTotal.localConfirm;
      } else {
        res = await currentAreaProvinceData(areaTree, newval);
      }
      detail.addConfirm = res.today.confirm;
      detail.nowConfirm = res.total.nowConfirm;
      detail.newval = newval;
      console.log(res);
      let { lastUpdateTime } = this.$store.state;
      let data = this.getChartData(res.children, detail);
      detail.import = detail.import ? detail.import : 0;
      // console.log(detail);
      eventBus.$emit("getDetail", detail);
      this.zero = data.length == 0;
      this.drawLine(newval, lastUpdateTime, data);
    },
    getChartData(data, detail) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == "境外输入") {
          detail.import = data[i].total.nowConfirm;
        }
        if (data[i].total.nowConfirm > 0) {
          let obj = {};
          obj.name = data[i].name;
          obj.value = data[i].total.nowConfirm;
          obj.add = data[i].today.confirm;
          arr.push(obj);
        }
      }
      return arr;
    },
    drawLine(name, lastUpdateTime, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: name + "疫情",
          subtext: "最近更新：" + lastUpdateTime,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: `{b0}<br />现有确诊: {c}人`,
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "现有确诊",
            type: "pie",
            radius: "60%",
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      myChart.on("click", function (params) {
        console.log(params);
        let detail = {};
        detail.addConfirm = params.data.add;
        detail.nowConfirm = params.data.value;
        detail.newval = params.data.name;
        detail.import = -1;
        eventBus.$emit("getDetail", detail);
      });
    },
  },
};
</script>

<style>
#myChart {
  width: 100%;
  height: 550px;
}
.zero {
  position: absolute;
  top: 20%;
  text-align: center;
  width: 100%;
}
</style>