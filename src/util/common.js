/**
 * Created by yi.dai on 2018/2/27.
 */
import { browserHistory } from 'react-router';
import CryptoJS from 'crypto-js';

export const checkToken = () => {
  const token = localStorage.getItem('token') || '';
  if (!token) {
    browserHistory.push('/');
  }
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const encryptPwd = (pwd) => {
  const KEY = 'abcdefgabcdefg12';

  return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pwd),
    CryptoJS.enc.Utf8.parse(KEY),
    {
      'padding': CryptoJS.pad.Pkcs7,
      'mode': CryptoJS.mode.ECB
    }).toString();
};

export const decryptPwd = (pwd) => {
  const key = CryptoJS.enc.Utf8.parse('abcdefgabcdefg12');
  const decrypt = CryptoJS.AES.decrypt(pwd, key, { 'mode': CryptoJS.mode.ECB, 'padding': CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

export const whitchType = (data) => {
  const type = Object.prototype.toString.call(data);
  switch (type) {
    case '[object Null]':
      return 'Null';
    case '[object Undefined]':
      return 'Undefined';
    case '[object Number]':
      return 'Number';
    case '[object Boolean]':
      return 'Boolean';
    case '[object String]':
      return 'String';
    case '[object Object]':
      return 'Object';
    case '[object Symbol]':
      return 'Symbol';
    case '[object Array]':
      return 'Array';
    case '[object Function]':
      return 'Function';
    case '[object Date]':
      return 'Date';
    case '[object Math]':
      return 'Math';
    default:
      return '';
  }
};

export const startLoading = () => {
  let div = document.querySelector('.spin-loading');
  if (!div) {
    div = document.createElement('div');
    div.className = 'spin-loading';
    document.body.appendChild(div);
  }

  let className = div.className || '';
  className = className.trim().split(/\s+/);
  const addClass = `loading-${className.length}-${new Date().getTime()}`;
  className.push(addClass);
  div.className = className.join(' ');
  return addClass;
};

export const closeLoding = (addClass) => {
  const div = document.querySelector('.spin-loading');
  if (div) {
    setTimeout(() => {
      let className = div.className || '';
      if (addClass) {
        className = className.replace(addClass, '');
        div.className = className;
      } else {
        div.className = 'spin-loading';
      }
    }, 100);
  }
};

export const getQueryString = (queryName) => {
  const queryString = document.location.search;
  const obj = {};
  if (queryString.length > 0) {
    const kv = queryString.substr(1).split('&');
    for (const item of kv) {
      const key = item.split('=')[0];
      const value = item.split('=')[1];
      obj[key] = value;
    }
  }

  if (obj[queryName]) {
    return obj[queryName];
  }
  return '';
};

export const setCookie = (name, value) => {
  const minute = 1;
  const expire = new Date();
  expire.setTime(expire.getTime() + minute * 60 * 1000);

  if (document.cookie.indexOf('expires=') > -1) {
    document.cookie.replace(/expires=.*;/ig, `expires=${expire.toGMTString()};`);
    document.cookie += ` ${name}=${escape(value)};`;
  } else {
    document.cookie += ` ${name}=${escape(value)};expires=${expire.toGMTString()};`;
  }
};

export const getCookie = (c_name) => {
  if (document.cookie.length > 0) {
    let c_start = 0;
    let c_end = 0;
    c_start = document.cookie.indexOf(`${c_name}=`);
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(';', c_start);
      if (c_end === -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
};

export const deleteCookie = (name) => {
  const value = getCookie(name);
  if (value) {
    document.cookie.replace(`${name}=${value};`, '');
  }
};
