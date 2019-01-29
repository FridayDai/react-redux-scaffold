/**
 * Created by yi.dai on 2018/2/28.
 */
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import { startLoading, closeLoding } from './common';

const fetchAction = (url, options, data = null) => {
  const method = options.method || 'GET';

  const headers = {
    'Accept': 'application/json',
    'token': localStorage.getItem('token') || '',
    'Content-Type': options.contentType || 'application/json;charset=utf-8'
  };

  let finalOptions = {};

  if (method.toUpperCase() === 'GET') {
    finalOptions = {
      'method': 'GET',
      headers,
      'cache': 'no-cache'
      // 'credentials': 'include' // 跨域带cookie 需要后端开启"Access-Control-Allow-Credentials: true"
    };
  } else if (method.toUpperCase() === 'POST') {
    finalOptions = {
      'method': 'POST',
      headers,
      'cache': 'no-cache',
      // 'credentials': 'include', // 跨域带cookie 需要后端开启"Access-Control-Allow-Credentials: true"
      'body': JSON.stringify(data)
    };
  }

  const loadingSpin = startLoading();

  return new Promise((resolve, reject) => {
    fetch(url, finalOptions)
      .then((response) => {
        closeLoding(loadingSpin);
        if (response.status >= 200 && response.status < 400) {
          // 这里做一层特殊处理，其实非常不好，我暂时还没想到解决方法
          if(response.redirected) {
              browserHistory.push(response.url);
          } else {
            return response.json();
          }
        }
        throw (response);
      })
      .then((data1) => {
        // 登陆验证
        if (data1.hasOwnProperty('errorCode') && data1.errorCode === 801) {
          browserHistory.push('/');
        } else {
          resolve(data1);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export default fetchAction;
