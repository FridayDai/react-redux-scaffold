import fetch from 'isomorphic-fetch';
export const TEST_ACTION = 'TEST_ACTION';
export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

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
    'type': LOGIN_SUCCESS,
    data
});
const loginFail = (data) => ({
    'type': LOGIN_FAIL,
    data
});

export const loginAction = (userName, password) => {
    return (dispatch) => {
        fetch(`http://shijunjie.me:8080/user/login?userName=${userName}&passWord=${password}`).then(response => response.json())
            .then((data) => {
                if(data && data.responseFlag === true) {
                    dispatch(loginSuccess(data));
                } else {
                    dispatch(loginFail(data));
                }
            }, (xhr) => {
                console.log(xhr);
            });
    };
};