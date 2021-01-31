<template>
  <div>
    <div class="news">
      <div class="tip">疫情资讯</div>
      <div class="newsList scrollbar">
        <div class="item" v-for="(item, index) in news" :key="item.id">
          <nuxt-link
            :to="{ name: 'newsDetail', params: { index: index } }"
            @click.native="saveArea"
            ><h5>{{ item.title }}</h5></nuxt-link
          >
          <div class="time">
            <h6>{{ item.pubDateStr }}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="more">
      <nuxt-link
        :to="{ name: 'newsDetail', params: { index: 10 } }"
        @click.native="saveArea"
        >看更多</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
    };
  },
  methods: {
    saveArea() {
      localStorage.setItem(
        "currentArea",
        JSON.stringify(this.$store.state.currentArea)
      );
    },
  },
  computed: {
    listenNews() {
      return this.$store.state.news;
    },
  },
  watch: {
    listenNews: {
      deep: true,
      handler: function (newval) {
        this.news = newval.slice(0, 10);
      },
    },
  },
};
</script>

<style scoped>
.news {
  border: 1px solid #f2f2f2;
  padding: 3px 10px;
  box-shadow: 0 0 5px #f6f6f6;
  border-radius: 5px;
  width: 200px;
  position: relative;
}
.newsList {
  min-height: 150px;
  width: 100%;
  overflow-y: auto;
  max-height: 250px;
}
.scrollbar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
}
.scrollbar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #cac9c9;
}
.scrollbar::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
.item {
  -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数*/
  display: -webkit-box; /*必须结合的属性，将对象作为弹性伸缩盒子模型显示*/
  -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式*/
  overflow: hidden;
  word-break: break-all;
  border-bottom: 1px solid #f2f2f2;
  padding: 3px 0;
  position: relative;
}
.more {
  text-align: center;
  font-size: 14px;
  font-weight: 400;
}
a {
  text-decoration: none;
  color: #1baeae;
}
.router-link-active {
  color: red;
}
.time {
  position: absolute;
  right: 0px;
  bottom: 3px;
  background-color: #fff;
  padding: 0 3px;
}
.tip {
  text-align: center;
  font-weight: 400;
  font-size: 14px;
}
</style>