let app = getApp()
const server = require("../../utils/server")
import jump from "../../utils/jump.js"
let interstitialAd = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitTotal: 1000,
    starCount: 2000,
    forksCount: 3000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({ adUnitId: 'adunit-010e171f2b417dd6' })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  cantact() {
    wx.previewImage({
      urls: ['data:image/png;base64,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']
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log(222)
      this.getTabBar().setData({
        PageCur: "about"
      })
    }
    this.numJump(89887, "visitTotal")
    this.numJump(30000, "starCount")
    this.numJump(200, "forksCount")
    interstitialAd.show().catch((err) => {
      console.error(err)
    })
  },
  numJump(total, key) {
    let n1 = new jump({
      from: total,//开始时的数字
      speed: 1000,// 总时间
      refreshTime: 10,// 刷新一次的时间
      decimals: 0,//小数点后的位数
      onUpdate: () => {//更新回调函数
        this.setData({
          [key]: n1.tempValue
        });
      },
      onComplete: () => {//完成回调函数

      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
