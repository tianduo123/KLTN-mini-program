const API_BASE = 'http://192.168.8.100/children/index.php/Api/index'
const API_IMG = 'http://192.168.8.100/children/'

//获取首页轮播图
function getBanner(){
  return API_BASE +'/turn'+'?admin_id=5'
}
//获取首页8个视频导航
function getTab(){
  return API_BASE + '/courseCategory' +'?admin_id=5'
}
//获取功能区列表
function getFunctional(){
  return API_BASE +'/eduCategory'+'?admin_id=5'
}


module.exports = {
  API_IMG,
  getBanner,
  getTab,
  getFunctional
}