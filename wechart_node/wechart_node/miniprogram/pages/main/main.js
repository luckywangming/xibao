const app = getApp()
const server = require("../../utils/server")
import jump from "../../utils/jump.js"

Page({
  data: {
    TabCur: 0,
    PageCur: "main",
    cardCur: 0,
    scrollLeft: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    total: 3000,
    password:'',
    isPsShow:false,
    secrit:'six666',
    i: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [{
      name: "中信",
      url: "/pages/oneMd/oneMd",
      img_ex: "../../images/zx3.png",
      tag: ["专属", "密码"],
      id: 0
    },{
      name: "通用1",
      url: "/pages/oneMd/oneMd",
      img_ex: "../../images/default11.jpg",
      tag: ["通用", "基金", "战报", "房地产", "销售额", "喜报"],
      id: 1
    }, {
      name: "通用2",
      url: "/pages/twoMd/twoMd",
      img_ex: "../../images/house.jpg",
      tag: ["通用", "培训", "嘉奖", "房地产", "销售额", "喜报"],
      id: 2
    }, {
      name: "通用3",
      url: "/pages/threeMd/threeMd?type=all",
      img_ex: "../../images/ss.jpg",
      tag: ["通用", "培训", "嘉奖", "房地产", "销售额", "喜报"],
      id: 3
    }, {
      name: "凯石基金",
      url: "/pages/kaishi/kaishi",
      img_ex: "../../images/kaishi.jpg",
      tag: ["通用", "凯石", "基金", "销售额", "喜报"],
      id: 4
    }, {
      name: "平安银行",
      url: "/pages/threeMd/threeMd?type=pingan",
      img_ex: "../../images/ss.jpg",
      tag: ["平安LOGO", "培训", "成交", "销售额", "喜报"],
      id: 5
    }, {
      name: "汇添富",
      url: "/pages/threeMd/threeMd?type=huitianfu",
      img_ex: "../../images/ss.jpg",
      tag: ["汇添富LOGO", "培训", "基金", "销售额", "喜报"],
      id: 6
    }, {
      name: "戈多",
      url: "/pages/geduo/geduo",
      img_ex: "../../images/default12.jpg",
      tag: ["地产LOGO", "房地产", "销售额", "喜报"],
      id: 7
    }, {
      name: "小明老师",
      url: "/pages/jiangshi/jiangshi",
      img_ex: "../../images/house2.jpg",
      tag: ["讲师定制", "培训", "喜报"],
      id: 8
    }, {
      name: "建筑",
      url: "/pages/jianzhu/jianzhu",
      img_ex: "../../images/default11.jpg",
      tag: ["房地产", "战报", "喜报"],
      id: 9
    }],
    load: true,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }]
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

  },

  onReady() {
    console.log("main")
    wx.hideLoading()

  },

  onShow() {
    let me = this
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log(222)
      this.getTabBar().setData({
        PageCur: "main"
      })
    }

    server.onGetTotal().then(res => {
      console.log(res)
      if (res.errMsg == "collection.get:ok" && res.data[0].total > 0) {

        console.log(res.data[0].total)
        // numDh(res.data[0].total)
        app.total = res.data[0].total
        let n1 = new jump({
          from: res.data[0].total,//开始时的数字
          speed: 1000,// 总时间
          refreshTime: 10,// 刷新一次的时间
          decimals: 0,//小数点后的位数
          onUpdate: () => {//更新回调函数
            this.setData({
              total: n1.tempValue
            });
          },
          onComplete: () => {//完成回调函数
            
          }
        });
      }
    })
  },
  setSecrit(e){
    if(e.detail.value == this.data.secrit){
      this.setData({
        isPsShow:false
      })
      wx.navigateTo({
        url: '../zx/zx'
      })
    }
  },
  secritShow(){
    this.setData({
      isPsShow:true
    })
  },
  hideSecrit(){
    this.setData({
      isPsShow:false
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // DotStyle(e) {
  //   this.setData({
  //     DotStyle: e.detail.value
  //   })
  // },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '动态设置内容,快速生成喜报...',
      imageUrl: "../../images/xibaoshare.png",
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功"
        })
      },
      fail: function (res) {
        // 分享失败
        wx.showToast({
          title: "分享失败"
        })
      }
    }

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);

        view.fields({
          size: true
        }, data => {
          console.log(data)
          if (!data) { return }
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }

})
