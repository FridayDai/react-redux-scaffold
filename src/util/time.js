/**
 * Created by yi.dai on 2018/4/20.
 */
/* eslint-disable */
// moment.js太大了，看了miment，所以自己试试写一个小而美的时间插件
// 需要考虑polyfill情况
Object.setPrototypeOf = Object.setPrototypeOf
    || function(obj, proto) {
      obj.__proto__ = proto;
      return obj;
    };
// function Miment() {
//     var miment = new Date();
//     // time.__proto__ = Date.prototype;
//     return miment;
// }

function Miment() {
  const instance = new (Function.prototype.bind.apply(Date, [Date].concat(...arguments)))();
  instance.__proto__ = Miment.prototype;
  Miment.prototype.__proto__ = Date.prototype;
  return instance;
}

Miment.prototype.firstDay = firstDay;
Miment.prototype.format = format;
Miment.prototype.timestamp = timestamp;

function firstDay() {
  const year = this.getFullYear();
  const month = this.getMonth();
  return Miment(year, month, 1);
}

function format(formatString) {
  // YYYY-MM-DD hh:mm:ss SSS
  let time;

  if (formatString === '' || formatString === null || formatString === undefined) {
    return this.format('YYYY-MM-DD hh:mm:ss');
  }

  function form(data) {
    if (isNaN(parseInt(data))) {
      return 0;
    }
    const num = parseInt(data);
    if (num > 9) {
      return num.toString();
    }
    return `0${num}`;
  }

  const year = this.getFullYear();
  const month = form((this.getMonth() + 1));
  const day = form(this.getDate());
  const hour = form(this.getHours());
  const minute = form(this.getMinutes());
  const second = form(this.getSeconds());
  const millSecond = form(this.getMilliseconds());

  time = formatString
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second)
    .replace('SSS', millSecond);


  return time;
}

function timestamp() {
  return this.valueOf();
}

module.exports = Miment;
