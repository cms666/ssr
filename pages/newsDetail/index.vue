<template>
  <div>
    <div class="news" ref="news">
      <div class="header">
        <el-page-header @back="goBack" content="新闻页面"> </el-page-header>
      </div>
      <div class="newList">
        <div class="block">
          <el-timeline>
            <div>
              <el-timeline-item
                :timestamp="item.pubDateStr"
                placement="top"
                v-for="item in news"
                :key="item.id"
                ref="newsList"
                class="item"
              >
                <el-card>
                  <h4>{{ item.title }}</h4>
                  <p class="content">{{ item.summary }}</p>
                  <p>{{ item.infoSource }} 发布于 {{ item.pubDateStr }}</p>
                </el-card>
              </el-timeline-item>
            </div>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // scrollToTop: false,
  transition:'test',
  data() {
    return {
      listHeight: [],
      scrollY: 0,
    };
  },
  mounted() {
    let area = JSON.parse(localStorage.getItem("currentArea"));
    console.log(area);
    // let that = this;
    // that.$nextTick(() => {
    //   // 只会在dom渲染完成后执行
    //   that._calculateHeight();
    //   let params = this.$route.params;
    //   if (params.index) {
    //     let newsList = that.$refs.newsList;
    //     console.log(newsList[0].$vnode.elm);
    //   }
    // });
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    _calculateHeight() {
      let newsList = this.$refs.newsList;

      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < newsList.length; i++) {
        let item = newsList[i];
        height += item.$vnode.elm.clientHeight; // 获取dom结构的高度
        this.listHeight.push(height);
      }
      console.log(this.listHeight);
    },
    initHeight() {
      let params = this.$route.params;
      console.log(params.id);
      if (params.id) {
        let index;
        let { news } = this.$store.state;
        console.log(news);
        news.forEach((item, index) => {
          if (item.id == params.id) {
            console.log(index);
          }
        });
        console.log(index);

        //  this.$refs.DOM.scrollTo(0,this.listHeight[index]);
      }
    },
  },
  computed: {
    timestampToTime(timestamp) {
      let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "/";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return Y + M + D + h + m;
    },
  },
  async asyncData({ store, $axios,params }) {
    if (!store.state.news.length) {
      let data = await $axios.$get(
        "http://49.232.173.220:3001/data/getTimelineService"
      );
      let filter = data.filter((item) => item.summary !== "").slice(0, 100);
      store.commit("addnews", filter);
      return { news: filter };
    } else {
      return { news: store.state.news.slice(params.index) };
    }
  },
};
</script scoped>

<style scoped>
.news {
  position: relative;
}
.header {
  position: fixed;
  top: 0;
  z-index: 99;
  padding: 0 5%;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #fff;
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  box-shadow: 10px 0 10px #c2c0c0;
}
.newList {
  padding-top: 50px;
  padding-left: 5%;
  padding-right: 5%;
  z-index: -1;
}
.content {
  text-indent: 30px;
}
</style>