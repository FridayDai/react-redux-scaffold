import {REQUEST_TOPICS, RECEIVE_TOPICS, } from '../actions/index';

const fetchTopicsReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_TOPICS:
            return Object.assign({}, state, {
                'isFetching': true,
                'data': []
            });
        case RECEIVE_TOPICS:
            return Object.assign({}, state, {
                'isFetching': false,
                'tab': action.tab,
                'page': action.page,
                'limit': action.limit,
                'data': action.data
            });
        default:
            return state;
    }
};

export default fetchTopicsReducer;