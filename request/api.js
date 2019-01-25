const API_BASE = 'http://192.168.8.100/children/index.php/Api'
const API_IMG = 'http://192.168.8.100/children/'
const BASE_ID = 5
let app = getApp()
//获取openid
function getOpenid(a,b,c){
  return API_BASE + `/user/openid?appid=${a}&secret=${b}&code=${c}`
}
//获取首页轮播图
function getBanner(){
  return API_BASE + `/index/turn?admin_id=${BASE_ID}`
}
//轮播详情
function getBannerDetail(e){
  return API_BASE + `/index/turnDetail?admin_id=${BASE_ID}&id=${e}`
}
//获取首页8个视频导航
function getTab(){ 
  return API_BASE + `/index/courseCategory?admin_id=${BASE_ID}`
}
//获取视频详情
function getVideiDetail(e){
  return API_BASE + `/index/course?admin_id=${BASE_ID}&cid=${e}`
}
//获取功能区列表
function getFunctional(){
  return API_BASE + `/index/eduCategory?admin_id=${BASE_ID}`
}
//获取预约顶部图片 
function getImg(){
  return API_BASE + `/Yu/image?admin_id=${BASE_ID}`
}
//获取联系我们数据
function getAddress(){
  return API_BASE + `/address/address?admin_id=${BASE_ID}`
}
//获取功能区详情
function getFuncdetail(e,f){
  return API_BASE + `/index/eduDetail?admin_id=${BASE_ID}&cid=${e}&openid=${f}`
}
//点赞接口
function like(e,f){
  return API_BASE + `/index/eduCategoryZan?admin_id=${BASE_ID}&openid=${f}&category_id=${e}`
}
//
module.exports = {
  API_IMG,
  getBanner,
  getTab,
  getFunctional,
  getImg,
  getBannerDetail,
  getAddress,
  getFuncdetail,
  getVideiDetail,
  like,
  getOpenid
}