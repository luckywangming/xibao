const app = getApp()
const server = require("../../utils/server")
const util = require("../../utils/util")
let interstitialAd = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page:0,
    type:"times",
    TabCur: 0,
    scrollLeft:0,
    tabArr:[{
      txt:"次数",
      type:"times"
    },{
      txt:"好友值",
      type:"ping"
    },{
      txt:"最新",
      type:"time"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page:0
    })
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({adUnitId: 'adunit-010e171f2b417dd6'})
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
  nextPage(){
    this.getPage()
  },
  tabSelect(e){
    console.log(e.target.dataset.type)
    this.setData({
      page:0,
      type:e.target.dataset.type,
      list: [],
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    this.getPage()
  },
  getPage(){
    let cpage = this.data.page * 20 
    
    try {
      server.onRank(cpage,this.data.type).then(res => {
        console.log(res)
        // this.list = 
        if (res.errMsg == "collection.get:ok") {
          if(res.data.length > 0){
            res.data.map((v,i)=>{
              return v.time = util.formatDateDynamic(v.time)
            })
          }
          console.log(res.data)

          this.setData({
            list: [...this.data.list,...res.data],
            page:++this.data.page
          })
          // console.log(me.data.list)
        }
      })
    } catch (error) {
      
    }
    interstitialAd.show().catch((err) => {
      console.error(err)
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        PageCur: "rank"
      })
    }
    this.getPage()
    interstitialAd.show().catch((err) => {
      console.error(err)
    })
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
