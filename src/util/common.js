/**
 * Created by yi.dai on 2018/2/27.
 */
import { browserHistory } from 'react-router';

export const checkToken = () => {
    const token = localStorage.getItem('token') || '';
    if(!token) {
        browserHistory.push('/');
    }
};

export const removeToken = () => {
    localStorage.removeItem('token');
};