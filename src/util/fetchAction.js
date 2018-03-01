/**
 * Created by yi.dai on 2018/2/28.
 */
import fetch from 'isomorphic-fetch';

const fetchAction = (url, options, data = null) => {
    const method = options.method || 'GET';

    const headers = {
        'Accept': 'application/json',
        'token': localStorage.getItem('token') || '',
        'Content-Type': options.contentType || 'application/json;charset=utf-8'
    };

    let finalOptions = {};

    if(method.toUpperCase() === 'GET') {
        finalOptions = {
            'method': 'GET',
            'headers': headers,
            'cache': 'no-cache'
            // 'credentials': 'include' // 跨域带cookie 需要后端开启"Access-Control-Allow-Credentials: true"
        };
    } else if(method.toUpperCase() === 'POST') {
        finalOptions = {
            'method': 'POST',
            'headers': headers,
            'cache': 'no-cache',
            // 'credentials': 'include', // 跨域带cookie 需要后端开启"Access-Control-Allow-Credentials: true"
            'body': JSON.stringify(data)
        };
    }

    return new Promise((resolve, reject) => {
        fetch(url, finalOptions)
            .then(response => {
                if(response.status >= 200 && response.status < 400) {
                    return response.json();
                } else {
                    throw(response);
                }
            })
            .then(data => {
                // 登陆验证
                if(data.hasOwnProperty('retCode')){
                    console.log('window.location = ?');
                }else{
                    resolve(data);
                }
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
};

export default fetchAction;