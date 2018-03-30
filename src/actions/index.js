import fetchAction from '../util/fetchAction';
import fetch from 'isomorphic-fetch';
export const TEST_ACTION = 'TEST_ACTION';
export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const GET_DOC_LIST_SUCCESS = 'GET_DOC_LIST_SUCCESS';
export const GET_DOC_SUCCESS = 'GET_DOC_SUCCESS';

export const testAction = () => {
    return () => {
        fetch(`/getName`).then(res => res.json()).then(
            (data) => console.log(data)
            ,
            (xhr) => console.log(xhr)
        );
    }
};

const requestTopics = (tab, page, limit) => ({
    'type': REQUEST_TOPICS,
    tab,
    page,
    limit
});
const receiveTopics = (tab, page, limit, data) => ({
    'type': RECEIVE_TOPICS,
    tab,
    page,
    limit,
    data
});

export const fetchTopics = (tab, page = 1, limit = 10) => {
    return (dispatch) => {
        dispatch(requestTopics(tab, page, limit));
        fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=false`)
            .then(response => response.json())
            .then(
                (data) => {
                    dispatch(receiveTopics(tab, page, limit, data));
                },
                (xhr) => console.log(xhr)
            );
    }
};

const loginSuccess = (data) => ({
    'type': LOGOUT_SUCCESS,
    data
});
const loginFail = (data) => ({
    'type': LOGOUT_FAIL,
    data
});

export const loginAction = (userName, password) => {
    return (dispatch) => {
        fetchAction(`http://shijunjie.me:8080/user/login?userName=${userName}&passWord=${password}`, {'method': 'GET'}).then(
            (data) => {
                if(data && data.responseFlag === true) {
                    dispatch(loginSuccess(data));
                } else {
                    dispatch(loginFail(data));
                }
            },
            (xhr) => {
                console.log(xhr);
            }
        );
    };
};

const logoutSuccess = (data) => ({
    'type': LOGIN_SUCCESS,
    data
});
const logoutFail = (data) => ({
    'type': LOGIN_FAIL,
    data
});

export const logoutAction = () => {
    return (dispatch) => {
        fetchAction(`http://shijunjie.me:8080/user/logout`, {'method': 'GET'}).then(
            (data) => {
                if(data && data.responseFlag === true) {
                    dispatch(logoutSuccess(data));
                } else {
                    dispatch(logoutFail(data));
                }
            },
            (xhr) => {
                console.log(xhr);
            }
        );
    }
};

const getDocListSuccess = (data) => ({
    'type': GET_DOC_LIST_SUCCESS,
    data
});
export const getDocList = () => {
    return (dispatch) => {
        fetchAction(`/rest/getDocList`, {'method': 'GET'}).then(
            (data) => {
                dispatch(getDocListSuccess(data));
            },
            (xhr) => {
                console.log(xhr);
            }
        );
    }
};

const getDocSuccess = (data) => ({
    'type': GET_DOC_SUCCESS,
    data
});
export const getDocById = (id) => {
    return (dispatch) => {
        fetchAction(`/rest/getDoc/${id}`, {'method': 'GET'}).then(
            (data) => {
                dispatch(getDocSuccess(data));
            },
            (xhr) => {
                console.log(xhr);
            }
        );
    }
};