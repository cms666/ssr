export const getcurArea = () => {
  return new Promise((resolve, reject) => {
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(res) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          resolve(res)
        } else {
          reject('error')
        }
      },
      { enableHighAccuracy: true }
    ); //enableHighAccuracy：是否要求浏览器获取最佳效果，默认为false
  });
};

export const currentAreaCityData = (state, province, city) => {
  return new Promise((resolve, reject) => {
    state.areaTree.children.forEach(item => {
      if (item.name == province) {
        item.children.forEach(res => {
          if (res.name == city) {
            resolve(res);
          }
        });
      }
    });
  });
};
export const currentAreaProvinceData = (data, province) => {
  return new Promise((resolve, reject) => {
    data.children.forEach(item => {
      if (item.name == province) {
        resolve(item);
      }
    });
  });
};


