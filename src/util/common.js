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