// import {state} from "../store/index";
export const getcurArea = () => {
  let geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(
    function(res) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        //  console.log(res.address);
        return res.address;
      } else {
      }
    },
    { enableHighAccuracy: true }
  ); //enableHighAccuracy：是否要求浏览器获取最佳效果，默认为false
};

export const currentAreaCityData = (state,province, city) => {
  return new Promise((resolve,reject)=>{
      state.areaTree.children.forEach(item => {
    if (item.name == province) {
      item.children.forEach(res => {
        if ((res.name == city)) {
          console.log(res);
          // return '2';
          resolve(res)
        }
      });
    }
  });
  })

};
export const currentAreaProvinceData = (province) => {
  state.areaTree.children.forEach(item => {
    if (item.name == province) {
      return {today:item.today,total:item.total};
    }
  });
};

