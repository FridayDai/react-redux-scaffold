import {REQUEST_TOPICS, RECEIVE_TOPICS} from '../actions/index';

export const fetchTopicsReducer = (state = {}, action) => {
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

// 注意：export可以多个，引入的时候要加{}。export default只能一个，引入的时候不需要加{}。