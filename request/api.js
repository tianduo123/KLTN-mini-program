//本地服务器地址
const API_BASE = 'http://192.168.8.101/syb/index.php/Api'
const API_IMG = 'http://192.168.8.101/syb/'
//服务器地址
// const API_BASE = 'https://www.shimokeji.cn/syb/index.php/Api'
// const API_IMG = 'https://www.shimokeji.cn/syb/'
const BASE_ID = 5
let app = getApp()
//获取openid
function getOpenid(a,b,c){
  return API_BASE + `/user/openid?appid=${a}&secret=${b}&code=${c}&admin_id=${BASE_ID}`
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
function getVideiDetail(e,f){
  return API_BASE + `/index/course?admin_id=${BASE_ID}&cid=${e}&openid=${f}`
}
//视频点赞
function video_zan(a,b){
  return API_BASE + `/index/courseZan?admin_id=${BASE_ID}&openid=${a}&course_id=${b}`
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
//短信接口
function getcode(e){
  return API_BASE + `/user/smsSend2?phone=${e}`
}
//用户注册
function login(a,b,c,d,g){
  return API_BASE + `/user/register?admin_id=${BASE_ID}&openid=${a}&phone=${b}&name=${c}&password=${d}&tuijian=${g}`
}
//判断用户是否注册
function isLogin(a){
  return API_BASE + `/user/isLogin?admin_id=${BASE_ID}&openid=${a}`
} 
//保存用户授权信息
function saveUser(a,b,c){
  return API_BASE + `/user/saveUser?admin_id=${BASE_ID}&openid=${a}&nickname=${b}&headimgurl=${c}`
}
//用户登录
function register(a,b){
  return API_BASE + `/user/login?phone=${a}&password=${b}`
}
//评论功能
function comment(a,b,c){
  return API_BASE + `/course/comment?admin_id=${BASE_ID}&openid=${a}&content=${b}&course_id=${c}`
}
//评论列表
function commentList(a){
  return API_BASE + `/course/commentList?admin_id=${BASE_ID}&course_id=${a}`
}
//评论点赞
function commentZan(a,b){
  return API_BASE + `/course/courseCommentZan?admin_id=${BASE_ID}&openid=${a}&comment_id=${b}`
}
//积分排行榜
function rankList(){
  return API_BASE + `/my/index`
}
//积分排行榜总榜
function allRankList(){
  return API_BASE + `/my/more`
}
//重置密码
function resetPsd(a,b){
  return API_BASE + `/user/forget_password?phone=${a}&password=${b}`
}
//成长豆规则
function getRule(){
  return API_BASE +  `/my/score_rule`
}
//获取用户积分
function getUserScore(a){
  return API_BASE + `/my/myScore?user_id=${a}`
}
//积分兑换列表
function goodsList(){
  return API_BASE + `/my/exchange?admin_id=${BASE_ID}`
}
//马上兑换
function getGoods(a,b,c,d){
  return API_BASE + `/my/rightExchange?admin_id=${BASE_ID}&openid=${a}&user_id=${b}&goods_id=${c}&num=${d}`
}
//兑换记录
function getLog(a,b){
  return API_BASE + `/my/exchangeRecord?admin_id=${BASE_ID}&openid=${a}&user_id=${b}`
}
//用户的积分记录
function getUserLog(a){
  return API_BASE + `/my/record?user_id=${a}`
}
//签到
function qiandao(a,b){
  return API_BASE + `/user/sign?admin_id=${BASE_ID}&openid=${a}&user_id=${b}`
}
//判断用户是否签到
function isQiandao(a,b){
  return API_BASE + `/user/is_sign?admin_id=${BASE_ID}&openid=${a}&user_id=${b}`
}
//用户提交建议
function submit(a,b,c){
  return API_BASE + `/comment/comment?admin_id=${BASE_ID}&openid=${a}&user_id=${b}&content=${c}`
}
//分享加积分
function share(a,b){
  return API_BASE + `/my/share_score?admin_id=${BASE_ID}&openid=${a}&user_id=${b}&type=0`
}
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
  getOpenid,
  getcode,
  login,
  isLogin,
  saveUser,
  register,
  video_zan,
  comment,
  commentList,
  commentZan,
  rankList,
  allRankList,
  resetPsd,
  getRule,
  goodsList,
  getGoods,
  getUserScore,
  getLog,
  getUserLog,
  qiandao,
  isQiandao,
  submit,
  share
}