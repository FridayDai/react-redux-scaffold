import fetch from 'isomorphic-fetch';
export const TEST_ACTION = 'TEST_ACTION';
export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';

export const testAction = (test) => ({
    'type': TEST_ACTION,
    'test': test
});

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