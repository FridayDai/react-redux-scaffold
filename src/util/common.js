/**
 * Created by yi.dai on 2018/2/27.
 */
import { browserHistory } from 'react-router';
import CryptoJS from 'crypto-js';

export const checkToken = () => {
    const token = localStorage.getItem('token') || '';
    if(!token) {
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
    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
    var decrypt = CryptoJS.AES.decrypt(pwd, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

export const whitchType = (data) => {
    const type = Object.prototype.toString.call(data);
    switch (type) {
        case "[object Null]":
            return 'Null';
        case "[object Undefined]":
            return 'Undefined';
        case "[object Number]":
            return 'Number';
        case "[object Boolean]":
            return 'Boolean';
        case "[object String]":
            return 'String';
        case "[object Object]":
            return 'Object';
        case "[object Symbol]":
            return 'Symbol';
        case "[object Array]":
            return 'Array';
        case "[object Function]":
            return 'Function';
        case "[object Date]":
            return 'Date';
        case "[object Math]":
            return 'Math';
        default:
            return '';
    }
};

export const startLoading = () => {
    let div = document.querySelector('.spin-loading');
    if(!div) {
        div = document.createElement('div');
        div.className = 'spin-loading';
        document.body.appendChild(div);
    }

    let className = div.className || '';
    className = className.trim().split(/\s+/);
    let addClass = `loading-${className.length}-${new Date().getTime()}`;
    className.push(addClass);
    div.className = className.join(' ');
    return addClass;
};

export const closeLoding = (addClass) => {
    let div = document.querySelector('.spin-loading');
    if(div){
        setTimeout(() => {
            let className = div.className || '';
            if(addClass) {
                className = className.replace(addClass, '');
                div.className = className;
            } else {
                div.className = 'spin-loading';
            }
        }, 100);
    }
};