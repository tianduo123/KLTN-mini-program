
//服务器地址
const API_BASE = 'https://syb.qhkltn.com/index.php/Api'
const API_IMG = 'https://syb.qhkltn.com/'
const BASE_ID = 15
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
//课程列表
function getVideoList(){
  return API_BASE + `/index/courseIndex?admin_id=${BASE_ID}`
}
//分类下视频id
function getVideoId(a){
  return API_BASE + `/index/courseIndex?admin_id=${BASE_ID}&cid=${a}`
}
//获取视频详情
function getVideiDetail(e,f){
  return API_BASE + `/index/course?admin_id=${BASE_ID}&id=${e}&openid=${f}`
}
//视频浏览量
function addBrowser(a){
  return API_BASE + `/index/courseBro?id=${a}`
}
//身临其境详情
function getSlqj(a,b){
  return API_BASE + `/index/eduDetail?id=${a}&admin_id=${BASE_ID}&openid=${b}`
}
//身临其境浏览量
function addBrowser2(a) {
  return API_BASE + `/index/eduBrowser?id=${a}`
}
//视频点赞
function video_zan(a,b){
  return API_BASE + `/index/courseZan?admin_id=${BASE_ID}&openid=${a}&course_id=${b}`
}
//获取功能区列表
function getFunctional(){
  return API_BASE + `/index/edu?admin_id=${BASE_ID}`
}
//获取预约顶部图片 
function getImg(){
  return API_BASE + `/Yu/image?admin_id=${BASE_ID}`
}
//预约接口
function yuyue(a,b,c,d){
  return API_BASE + `/Yu/yuyue?admin_id=${BASE_ID}&order_name=${a}&phone=${b}&yuyue_time=${c}&openid=${d}`
}
//我的预约
function myyuyeu(a){
  return API_BASE + `/Yu/myYuyue?openid=${a}&admin_id=${BASE_ID}`
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
//身临其境视频点赞
function like2(a,b){
  return API_BASE + `/index/eduCategoryZan?admin_id=${BASE_ID}&openid=${a}&edu_id=${b}`
}
//短信接口
function getcode(e){
  return API_BASE + `/user/smsSend2?phone=${e}`
}
//用户注册
function login(a,b){
  return API_BASE + `/user/register?admin_id=${BASE_ID}&openid=${a}&phone=${b}`
}
//判断用户是否注册
function isLogin(a){
  return API_BASE + `/user/isLogin?admin_id=${BASE_ID}&openid=${a}`
} 
//保存用户授权信息
function saveUser(a,b,c){
  return API_BASE + `/user/saveUser?admin_id=${BASE_ID}&openid=${a}&nickname=${b}&headimgurl=${c}`
}
//
//用户登录
function register(a,b){
  return API_BASE + `/user/login?phone=${a}&password=${b}`
}
//评论功能
function comment(a,b,c){
  return API_BASE + `/course/comment?admin_id=${BASE_ID}&openid=${a}&content=${b}&course_id=${c}`
}
//身临其境评论
function comment2(a, b, c) {
  return API_BASE + `/edu/comment?admin_id=${BASE_ID}&openid=${a}&content=${b}&edu_id=${c}`
}
//评论列表
function commentList(a){
  return API_BASE + `/course/commentList?admin_id=${BASE_ID}&course_id=${a}`
}
//身临其境评论列表
function commentList2(a){
  return API_BASE + `/edu/commentList?admin_id=${BASE_ID}&edu_id=${a}`
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
//附近商家
function nearList(a,b){
  return API_BASE + `/address/fiveRange?wei=${a}&jing=${b}&admin_id=${BASE_ID}`
}
//附近详情
function nearDetail(a){
  return API_BASE + `/address/video?admin_id=${a}`
}
//商家留言板
function message(){
  return API_BASE + `/Comment/commentList?admin_id=${BASE_ID}`
}
//成长豆任务是否完成
function isDone(a,b){
  return API_BASE + `/my/unclaimed?admin_id=${BASE_ID}&openid=${a}&user_id=${b}`
}
//领取任务积分
function getScore(a,b,c,d){
  return API_BASE + `/my/getScore?admin_id=${BASE_ID}&openid=${a}&user_id=${b}&score_num=${c}&type=${d}`
}
//判断分享和提建议今日是否领取
function isGet(a,b){
  return API_BASE + `/comment/is_ling?admin_id=${BASE_ID}&openid=${a}&user_id=${b}`
}
//填写推荐人
function tuijian(a,b){
  return API_BASE + `/user/registeScores?tuijian_phone=${a}&user_id=${b}`
}
//用户是否填写过推荐人
function isMake(a){
  return API_BASE + `/user/is_tuijian?user_id=${a}`
}
//取消兑换
function cancel(a){
  return API_BASE + `/my/del_exchangeAdd?admin_id=${BASE_ID}&id=${a}`
}
//身临其境更新点赞数量
function getZan(a){
  return API_BASE + `/index/update_zan?id=${a}`
}
//主打课更新点赞数量
function getZan2(a){
  return API_BASE + `/index/course_update?id=${a}`
}
//新注册用户领积分
function getNscore(a,b){
  return API_BASE + `/user/newUserScore?user_id=${a}&num=${b}`
}
//获取喵喵老师二维码
function getShare(){
  return API_BASE + `/address/appMa`
}
//广告位列表 1--> 首页上 2--> 首页下 3--> 详情页
function getGg(a){
  return API_BASE + `/active/active?admin_id=15&address_id=${a}`
}
//广告详情
function getGgDetail(a){
  return API_BASE + `/active/active_detail?id=${a}`
}
//广告点击量
function ggClick(a){
  return API_BASE + `/active/click?id=${a}`
}
//每日即时看列表
 function look1(a){
   return API_BASE + `/view/viewIndex?admin_id=${BASE_ID}&page=${a}`
 }
//每日即时看详情
function look2(a,b) {
  return API_BASE + `/view/view?admin_id=${BASE_ID}&id=${a}&openid=${b}`
}
//每日即时看浏览量+1
function look3(a) {
  return API_BASE + `/view/viewBro?id=${a}`
}
//每日即时看点赞
function look4(a,b) {
  return API_BASE + `/view/viewZan?admin_id=${BASE_ID}&openid=${a}&view_id=${b}`
}
//每日即时看更新视频点赞数量
function look5(a) {
  return API_BASE + `/view/view_update?id=${a}`
}
//每日即时看视频评论
function look6(a,b,c) {
  return API_BASE + `/view/comment?openid=${a}&admin_id=${BASE_ID}&view_id=${b}&content=${c}`
}
//每日即时看评论列表
function look7(a) {
  return API_BASE + `/view/commentList?admin_id=${BASE_ID}&view_id=${a}`
}
//每日即时看评论点赞
function look8(a,b) {
  return API_BASE + `/view/viewCommentZan?admin_id=${BASE_ID}&openid=${a}&comment_id=${b}`
}
//判断当前商家是否开通拼团功能
function hasPin(){
  return API_BASE + `/common/is_active?admin_id=${BASE_ID}`
}

module.exports = {
  API_IMG, BASE_ID,
  getBanner,getTab,getFunctional,getImg,getBannerDetail,getAddress,getVideoList,getFuncdetail,getVideiDetail,like,
  getOpenid,getcode,yuyue,login,isLogin,saveUser,register,video_zan,comment,commentList,commentZan,rankList,allRankList,
  resetPsd,getRule,goodsList,getGoods,getUserScore,getLog,getUserLog,qiandao,isQiandao,submit,share,nearList,message,
  isDone, getScore, isGet, tuijian, isMake, cancel, addBrowser, addBrowser2, comment2, commentList2, like2, getZan,getZan2,        
  getNscore, getShare, getVideoId, getSlqj, getGg, getGgDetail, ggClick, nearDetail, look1, look2, look3, look4, look5, look6,    
  look7, look8, hasPin, myyuyeu
}