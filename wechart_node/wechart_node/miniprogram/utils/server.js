wx.cloud.init()
const db = wx.cloud.database()
// const app = getApp()
//添加一条新记录
const onAdd = (options) => {
  let { set, data } = options
  return db.collection(set).add({
    data: data
  })
}

const onAddRank = (num) => {
  let app = getApp()
  let k = ""
  let pN = 0
  let tN = 0
  if (num == 1) {
    k = "ping"
    pN = 1
  }
  if (num == 2) {
    k = "times"
    tN = 1
  }
  console.log(num)
  // wx.showLoading({
  //   title: '加载中...',
  //   mask: true
  // });
  if (!app._id) {
    return onAdd({
      set: "rank",
      data: {
        name: app.userInfo ? app.userInfo.nickName : "李美丽",
        avatar: app.userInfo ? app.userInfo.avatarUrl : "https://avatar-static.segmentfault.com/649/710/6497101-5cc18e9784a24_huge256",
        ping: pN,
        times: tN,
        time: new Date().getTime()
      }
    }).then(res => {
      console.log(res)
      if(num == 2){
        onTotalChange()
      }
      app._id = res._id
      console.log(k)
      app[k] = 1
      // wx.hideLoading()
      return res
    })
  } else {
    // let result = onChangeRank()
    // console.log(result)
    console.log(k)
    console.log(app[k])
    return onChange({
      set: "rank",
      openid: app._id,
      data: {
        [k]: app[k] - 0 + 1,
        time: new Date().getTime()
      }
    }).then(res => {
      app[k]++
      if(num == 2){
        onTotalChange()
      }
      // wx.hideLoading()
      return res
    })
  }
}
//根据openid获取信息
const onWhere = (options) => {
  let { set, data } = options
  console.log(data)
  return db.collection(set).where(data)
    .get()
}
const onGetTotal = () => {
  return onWhere({
    set: "total",
    data: {
      _openid: "oO_360Ifftsi_gUsW5Ky9kRDh21M"
    }
  })
}
//获取排名列表
const onRank = (num,type) => {
  return db.collection("rank").orderBy(type, 'desc')
    .skip(num)
    .get()
}

//修改某一条数据
const onChange = (options) => {
  let { set, openid, data } = options
  return db.collection(set).doc(openid).update({
    data: data
  })
}
const onTotalChange = () => {
  let app = getApp()
  console.log(app.total)
  let newVal = app.total++
  onChange({
    set:"total",
    openid:"980c4b4e-2d62-4fef-9eaa-4530541929ab",
    data:{
      total:++newVal
    }
  }).then(res=>{
    console.log(res)
  })
}
const onChangeRank = () => {
  console.log(app._id)
  console.log(app.ping)
  let app = getApp()
  return db.collection("rank").doc(app._id).update({
    data: {
      ping: app.ping - 0 + 1
    }
  }).then(res => {
    console.log(res)
    app.ping++
    return res
  })
}
module.exports = {
  onAdd,
  onWhere,
  onChange,
  onAddRank,
  onRank,
  onGetTotal
}
