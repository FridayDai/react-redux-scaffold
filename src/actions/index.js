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
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';

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

export const addCommentSuccess = (data) => ({
        'type': ADD_COMMENT_SUCCESS,
        data
});

export const addComment = (comment) => {
    return (dispatch) => {
        fetchAction(`/rest/addcomment`, {'method': 'POST'}, {'comment': comment}).then(
            (data) => {
                dispatch(addCommentSuccess(data));
            },
            (xhr) => {
                console.log(xhr);
            }
        );
    }
};

export const getCommentSuccess = (data) => ({
    'type': GET_COMMENTS_SUCCESS,
    'data': data
});

export const getComments = () => {
    return (dispatch) => {
        fetchAction(`/rest/getcomments`, {'method': 'GET'}).then(
            data => {
                dispatch(getCommentSuccess(data));
            },
            (xhr) => {
                console.log(xhr);
            }
        )
    }
};