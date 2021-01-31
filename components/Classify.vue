<template>
  <div>
    <div class="container">
      <div
        class="province"
        :class="{ selected: selectedNum == item.id }"
        v-for="(item, id) in provinceName"
        :key="id"
        @click="selectedPro(item.name, item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provinceName: [
        { name: "当地", id: 0 },
        { name: "全国", id: 1 },
        { name: "北京", id: 2 },
        { name: "上海", id: 3 },
        { name: "天津", id: 4 },
        { name: "重庆", id: 5 },
        { name: "河北", id: 6 },
        { name: "山西", id: 7 },
        { name: "辽宁", id: 8 },
        { name: "吉林", id: 9 },
        { name: "河南", id: 10 },
        { name: "江苏", id: 11 },
        { name: "浙江", id: 12 },
        { name: "安徽", id: 13 },
        { name: "福建", id: 14 },
        { name: "江西", id: 15 },
        { name: "山东", id: 16 },
        { name: "湖北", id: 17 },
        { name: "湖南", id: 18 },
        { name: "广东", id: 19 },
        { name: "海南", id: 20 },
        { name: "四川", id: 21 },
        { name: "贵州", id: 22 },
        { name: "云南", id: 23 },
        { name: "陕西", id: 24 },
        { name: "甘肃", id: 25 },
        { name: "青海", id: 26 },
        { name: "黑龙江", id: 27 },
        { name: "内蒙古", id: 28 },
        { name: "广西", id: 29 },
        { name: "西藏", id: 30 },
        { name: "宁夏", id: 31 },
        { name: "新疆", id: 32 },
        { name: "台湾", id: 33 },
        { name: "香港", id: 34 },
        { name: "澳门", id: 35 },
      ],
      selectedNum: 0,
    };
  },
  methods: {
    selectedPro(name, id) {
      console.log(name, id);
      if(id == 0){
        this.$store.commit("updateSelected", this.$store.state.currentArea.province);
      }else{
        this.$store.commit("updateSelected", name);
      }
      this.selectedNum = id;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.province {
  flex: 8%;
  text-align: center;
  padding: 5px 0;
  position: relative;
}
.province::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  width: 0;
  height: 2px;
  background: #3c2d2d;
  z-index: -99;
}
.province:hover {
  background: #f2f2f2;
  cursor: pointer;
  transition: all 0.5;
}
.province:hover::after {
  left: 0;
  transition: all 0.5s;
  width: 100%;
}
.selected {
  color: red !important;
  border-bottom: 2px solid red !important;
}
/* .enter{
  background: #f2f2f2;
  border-bottom: 1px solid black;

} */
</style>