<template>
  <div class="container">
    <Header/>
    {{data}}
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
    async asyncData({store}){
    // let {data} = await axios.get('https://m.maoyan.com/ajax/movieOnInfoList')
    // console.log(data.movieList);
    // return {info:data.movieList}
    let {data} = await axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5')
    let obj  = eval("("+data.data+")")
    let {lastUpdateTime,chinaAdd,chinaTotal,areaTree} = obj
    console.log(obj,areaTree[0]);
    store.commit('addTree',areaTree[0])
    store.commit('addlastUpdateTime',lastUpdateTime)
    store.commit('addchinaTotal',chinaTotal)
    store.commit('addchinaAdd',chinaAdd)
    return{data:areaTree[0]}
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
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
