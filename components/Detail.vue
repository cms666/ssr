<template>
  <div>
    <div class="detail">
      <div class="item">{{ detail.newval }}</div>
      <div class="item" :class="{'visible':detail.import == -1}">境外输入：{{ detail.import }}</div>
      <div class="item">现有确诊：{{ detail.nowConfirm }}</div>
      <div class="item">今日新增：{{ detail.addConfirm }}</div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "../plugins/eventBus";
export default {
  data() {
    return {
      detail: {
        import:0,
        nowConfirm:0,
        addConfirm:0,
        newval:'当地'
      },
    };
  },
  created() {
    eventBus.$on("getDetail", (data) => {
      // console.log(data);
      this.detail = data;
    });
  },
};
</script>

<style>
.detail {
  border: 1px solid #f2f2f2;
  padding: 10px;
  box-shadow: 0 0 5px #f6f6f6;
  border-radius: 5px;
}
.visible{
  visibility: hidden;
}
</style>