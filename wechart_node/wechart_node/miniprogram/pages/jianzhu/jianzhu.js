//logs.js
const util = require('../../utils/util.js')
const app = getApp()
const server = require('../../utils/server')
let interstitialAd = null
Page({
  data: {
    isUserInfo: false,
    canvasWidth: 0,
    canvasHeight: 0,
    proportion: 0,
    isSystom: '',
    isMode: '',
    souquan:false,
    isSeeOnce:false,
    title1: "热烈庆祝",
    title2: "晋城分公司",
    money: 150,
    isFocus: '',
    name: "万达广场工程,碧桂园工程,中铁建筑",
    ndeg: 0,
    project1: "合同金额",
    project2: "96万元",
    project2Arr: ["线上新手专享", "线上车贷宝"],
    // 线上车贷宝
    time: "2018年8月22日",
    tempFilePath: "",
    num: 0,
    nameList: [
      "此处会存储输入过的姓名",
      "李蔓洁"
    ],
    isShowNameList: false
  },
  onShow: function () {
    let me = this;
    wx.onAccelerometerChange(function (res) {
      if (res.x > 1) {
        wx.stopAccelerometer()
        me.save()
      }
    })
  },
  onLoad: function () {
    let me = this;
    if (!!app.userInfo) {
      me.setData({
        isUserInfo: false
      })
    } else {
      me.setData({
        isUserInfo: true
      })
    }
    this.setData({
      time: util.formatTime(new Date()).replace("/", "年").replace("/", "月") + "日"
    })
  },
  moneyJia() {
    this.setData({
      money: this.data.money += 50
    })
    this.init()
  },
  moneyJian() {
    if (this.data.money > 150) {
      this.setData({
        money: this.data.money -= 50
      })
      this.init()
    }
  },
  nameChoose(e) {
    if (e.detail.value) {
      this.setData({
        name: (this.data.nameList)[e.detail.value]
      })
      this.init()
    }
  },
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
  clearName() {
    let me = this;
    wx.removeStorage({
      key: "nameList",
      success: function () {
        wx.showToast({
          title: "清除姓名列表成功"
        });
        me.setData({
          nameList: [
            "此处会存储输入过的姓名",
            "李蔓洁"
          ]
        })
      },
      fail: function () {
        wx.showToast({
          title: "清除姓名列表失败"
        })
      }
    })
  },
  projectChange() {
    let arr = ["线上新手专享", "线上车贷宝"];
    this.setData({
      num: (this.data.num + 1) % arr.length
    })
    this.setData({
      project2: arr[this.data.num]
    })
    this.init()
  },
  inputFocus(e) {

    switch (e.target.dataset.id) {
      case "1":
        this.setData({
          isFocus: {
            a: 'a'
          }
        });
        break;
      case "2":
        this.setData({
          isFocus: {
            b: 'b'
          }
        });
        break;
      case "3":
        this.setData({
          isFocus: {
            c: 'c'
          }
        });
        break;
      case "4":
        this.setData({
          isFocus: {
            d: 'd'
          }
        });
        break;
      case "6":
        this.setData({
          isFocus: {
            e: 'e'
          }
        });
        break;
      case "5":
        this.setData({
          isFocus: {
            f: 'f'
          }
        });
        break;
    }
  },
  changeInput(e) {
    this.setData({
      isFocus: {}
    })
    switch (e.target.dataset.id) {
      case "1":
        this.setData({
          title1: e.detail.value
        });
        break;
      case "2":
        this.setData({
          title2: e.detail.value
        });
        break;
      case "3":
        this.setData({
          money: e.detail.value
        });
        break;
      case "4":
        let arr = this.data.nameList;
        let newValue = e.detail.value;
        let isFind = arr.find((value) => {
          return value == newValue
        })
        if (!isFind) {
          this.data.nameList.push(e.detail.value)
          this.setData({
            nameList: this.data.nameList
          });
        }
        this.setData({
          name: e.detail.value,
        });
        break;
      case "5":
        this.setData({
          project2: e.detail.value
        });
        break;
      case "6":
        this.setData({
          project1: e.detail.value
        });
        break;
    }
    this.canvasSet()
    this.init()
  },
  init() {
    // wx.showLoading({
    //   mask: true
    // });
    let me = this;
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage("../../images/default11.jpg", 0, 0, this.data.canvasWidth, this.data.canvasHeight);
    ctx.font = "12px Arial";
    ctx.fillStyle = "#f9e636"
    ctx.setTextAlign("center")
    ctx.fillText(this.data.title1, this.data.canvasWidth / 2 + 8, this.data.canvasWidth / 2.34)
    ctx.font = "bold 18px Arial";
    ctx.fillStyle = "#ff0"
    ctx.fillText(this.data.title2, this.data.canvasWidth / 2 + 8, this.data.canvasWidth / 2.04)
    ctx.font = "12px Helvetica, Arial, sans-serif"
    ctx.fillStyle = "#f9e636"
    ctx.setTextAlign("center")
    ctx.fillText("签约", this.data.canvasWidth / 2 + 8, this.data.canvasWidth / 1.78)
    ctx.font = "bold 18px Arial";
    ctx.fillStyle = "#ff0"
    ctx.setTextAlign("left")
    // ctx.fillText(this.data.name, this.data.canvasWidth / 2 + 8, this.data.canvasWidth / 1.44)
    // drawText
    // ctx.shadowColor = 'rgba(0,0,0,0.6)'
    // ctx.shadowOffsetX = 2
    // ctx.shadowOffsetY = 2
    // ctx.shadowBlur = 1
    this.drawText(ctx,this.data.name, this.data.canvasWidth / 2 - this.data.money / 2, this.data.canvasWidth / 1.74,(this.data.money) / 375 * this.data.canvasWidth)
    ctx.fillStyle = "#ff0"
    ctx.font = "12px Arial";
    ctx.fillStyle = "#f9e636"
    ctx.setTextAlign("center")
    ctx.fillText(this.data.project1, this.data.canvasWidth / 2 + 8, this.data.canvasWidth / 1.20)

    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#ff0"
    ctx.setTextAlign("center")
    ctx.fillText(this.data.project2, this.data.canvasWidth / 2 + 8, this.data.canvasWidth / 1.11)

    ctx.font = "18px Arial";
    ctx.fillStyle = "#ffd66c"
    ctx.setTextAlign("center")
    ctx.fillText(this.data.time, this.data.canvasWidth / 2 + 8, this.data.canvasWidth / 0.92)
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: me.data.canvasWidth,
        height: me.data.canvasHeight,
        destWidth: 710,
        destHeight: 1000,
        canvasId: 'myCanvas',
        success: function (res) {
          me.setData({
            tempFilePath: res.tempFilePath,
            ctx: ctx
          })
          // wx.hideLoading()
        }
      })
    });
    // wx.setStorageSync("nameList", this.data.nameList);
    // me.posInit(ctx, this.data.canvasWidth / 2)
  },
  souquanok(){
    let me = this;
    wx.getSetting({
      success: function (res) {
        console.log(res.authSetting['scope.writePhotosAlbum'])
        if (res.authSetting['scope.writePhotosAlbum']) {
          me.setData({
            souquan:false
          })
          wx.showToast({
            title:"设置成功"
          })
        }else{
          wx.showToast({
            title:"设置失败",
            icon:"none"
          })
        }
      }
    })
    
  },
  onGotUserInfo(e) {
    console.log(e.detail)
    // getUserInfo:fail auth deny
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      wx.showToast({
        title: "您未允许授权",
        icon: "none"
      })
    }
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.showToast({
        title: "您已允许授权",
        icon: "none"
      })
      app.userInfo = e.detail.userInfo
      this.setData({
        isUserInfo: false
      })
    }
  },
  toRank(){
    wx.switchTab({
      url: '../rank/rank'
    })
  },
  shang() {
    const videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-c915b463d1b15f23'
    })
    videoAd.onError(err => {

    })
    videoAd.load()
      .then(() => videoAd.show())
      .catch(err => {
        videoAd.load()
          .then(() => videoAd.show())
      })
    videoAd.onClose(res => {
      // 用户点击了【关闭广告】按钮
      // 小于 2.1.0 的基础库版本，res 是一个 undefined
      if (res && res.isEnded || res === undefined) {
        try {
          server.onAddRank(1).then(res => {
            console.log(res)
            if (res.errMsg == "document.update:ok" || res.errMsg == "collection.add:ok") {
              wx.showToast({
                title: "好友值+1",
                icon: 'none',
                duration: 2000
              })
            }
          })
        } catch (error) {

        }
      } else {
        wx.showToast({
          title: "看完视频才可以增加心动值哦~",
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  save() {
    let me = this;
    if (!app.userInfo) {
      wx.showToast({
        title: "请点击下方按钮授权您的信息",
        icon: "none"
      })
      return
    }
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.writePhotosAlbum'] == undefined) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.showToast({
                title: "请再次点击保存",
                icon: "none"
              })
            }
          })
        }
        if (res.authSetting['scope.writePhotosAlbum'] == false) {
          me.setData({
            souquan: true
          })
          wx.showToast({
            title: "请点击下方按钮授予相册权限",
            icon: "none"
          })
        }else{
          if (!me.data.isSeeOnce) {
            const videoAd = wx.createRewardedVideoAd({
              adUnitId: 'adunit-eaa8fc3c2367d877'
            })
            videoAd.onError(err => {
              wx.saveImageToPhotosAlbum({
                filePath: me.data.tempFilePath,
                success(res) {
                  console.log(24)
                  wx.showToast({
                    title: "已保存到相册",
                    success: function () {
                      wx.vibrateLong();
                      setTimeout(function () {
                        wx.startAccelerometer()
                      }, 2000)
                    }
                  })
                },
                fail: function (err) {
                  console.log(err)
                }
              })
              try {
                server.onAddRank(2).then(res => {
                  console.log(res)
                  if (res.errMsg == "document.update:ok" || res.errMsg == "collection.add:ok") {
      
                  }
                })
              } catch (error) {
                
              }
            })
            videoAd.load()
              .then(() => videoAd.show())
              .catch(err => {
                videoAd.load()
                  .then(() => videoAd.show())
              })
            videoAd.onClose(res => {
              // 用户点击了【关闭广告】按钮
              // 小于 2.1.0 的基础库版本，res 是一个 undefined
              if (res && res.isEnded || res === undefined) {
                me.setData({
                  isSeeOnce: true
                })
      
                wx.saveImageToPhotosAlbum({
                  filePath: me.data.tempFilePath,
                  success(res) {
                    console.log(24)
                    wx.showToast({
                      title: "已保存到相册",
                      success: function () {
                        wx.vibrateLong();
                        setTimeout(function () {
                          wx.startAccelerometer()
                        }, 2000)
                      }
                    })
                  },
                  fail: function (err) {
                    console.log(err)
                  }
                })
                try {
                  server.onAddRank(1).then(res => {
                    console.log(res)
                    if (res.errMsg == "document.update:ok" || res.errMsg == "collection.add:ok") {
                      wx.showToast({
                        title: "好友值+1",
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  })
                } catch (error) {
      
                }
                try {
                  server.onAddRank(2).then(res => {
                    console.log(res)
                    if (res.errMsg == "document.update:ok" || res.errMsg == "collection.add:ok") {
      
                    }
                  })
                } catch (error) {
                  
                }
              } else {
                wx.showToast({
                  title: "看完一次视频才可以保存到相册哦~",
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          } else {
            wx.saveImageToPhotosAlbum({
              filePath: me.data.tempFilePath,
              success(res) {
                console.log(24)
                wx.showToast({
                  title: "已保存到相册",
                  success: function () {
                    wx.vibrateLong();
                    setTimeout(function () {
                      wx.startAccelerometer()
                    }, 2000)
                  }
                })
              },
              fail: function (err) {
                console.log(err)
              }
            })
            try {
              server.onAddRank(2).then(res => {
                console.log(res)
                if (res.errMsg == "document.update:ok" || res.errMsg == "collection.add:ok") {
      
                }
              })
            } catch (error) {
              
            }
          }
        }
      }
    })
    
  },
  imgLoaded(e) {
    this.setData({
      proportion: (e.detail.width / e.detail.height).toFixed(2)
    })
    this.canvasSet()
    this.init()
  },
  bindDateChange(e) {
    console.log(e.detail.value)
    this.setData({
      time: e.detail.value.replace("-", "年").replace("-", "月") + "日"
    })
    this.init()
  },
  drawText(context, t, x, y, w) {

    var chr = t.split("");
    var temp = "";
    var row = [];

    // context.font = "20px Arial";
    // context.fillStyle = "black";
    // context.textBaseline = "middle";

    for (var a = 0; a < chr.length; a++) {
      if (row.length == 0) {
        if (context.measureText(temp).width < w - 20) {
          ;
        }
        else {
          row.push(temp);
          temp = "";
        }
        temp += chr[a];
      } else {
        if (context.measureText(temp).width < w) {
          ;
        }
        else {
          row.push(temp);
          temp = "";
        }
        temp += chr[a];
      }
    }

    row.push(temp);

    for (var b = 0; b < row.length; b++) {
      if (b == 0) {
        context.fillText(row[b], x + 20, y + (b + 1) * 20);
      } else {
        context.fillText(row[b], x, y + (b + 1) * 20);
      }
    }
  },
  canvasSet: function () {
    var me = this
    wx.getSystemInfo({
      success: function (res) {
        me.setData({
          canvasWidth: res.windowWidth,
          canvasHeight: res.windowWidth / me.data.proportion
        })
      }
    })
  }
})
