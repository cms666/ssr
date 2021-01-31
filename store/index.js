export const state = () => ({
  selected:'',
  areaTree: {
  },
  currentArea:{
    province:'',
    city:''
  },
  mydata:{},
  lastUpdateTime:'',
  chinaTotal:{},
  chinaAdd:{},
  news:[]
})
export const mutations = {
  addTree(state, text) {
    state.areaTree = text
  },
  updateSelected(state, text) {
    state.selected = text
  },
  addArea(state, text) {
    state.currentArea.province = text.province
    state.currentArea.city = text.city
  },
  addlastUpdateTime(state, text) {
    state.lastUpdateTime = text
  },
  addchinaTotal(state, text) {
    state.chinaTotal = text
  },
  addchinaAdd(state, text) {
    state.chinaAdd = text
  },
  addmydata(state, text) {
    state.mydata = text
  },
  addnews(state,text){
    state.news = text
  }
}