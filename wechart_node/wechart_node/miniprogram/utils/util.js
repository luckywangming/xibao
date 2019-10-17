const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const times= (timestap) =>{
  if(!timestap){
    return ''
  }
  let now = new Date(timestap);
  now = now.getFullYear() > 0 ? now : new Date(Date.parse(timestap.replace(/-/g, "/")));
  //年
  let year=now.getFullYear();
  //月
  let month=now.getMonth()+1;
  //日
  let date=now.getDate();

  return year+"-"+(month>9?month:"0"+month)+"-"+(date>9?date:"0"+date);
}
const formatDateDynamic = (publishTime) => {
  let currentTime = new Date().getTime();
  let time = currentTime - publishTime;
  let day = parseInt(time / (24 * 60 * 60 * 1000));
  let hour = parseInt(time / (60 * 60 * 1000)) - day * 24;
  let min = parseInt(time / (60 * 1000)) - day * 24 * 60 - hour * 60;
  let str = "";
  if (day > 0 && day < 15)
    str = day + "天前";
  else if (day == 0 && hour > 0)
    str = hour + "小时前";
  else if (day == 0 && hour == 0 && min > 0)
    str = min + "分钟前";
  else if (day == 0 && hour == 0 && min <= 5) {
    str = "刚刚";
  } else {
    publishTime = parseInt(publishTime);
    str = isNaN(publishTime) ? "" : times(publishTime);
  }
  return str;
}
module.exports = {
  formatTime: formatTime,
  formatDateDynamic
}
