// 云函数入口函数
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()

exports.main = (event, context) => {
  const {userInfo, a, b} = event
  const {OPENID, APPID} = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  const sum = a + b

  return {
    OPENID,
    APPID,
    sum
  }
}
