/**
 * Created by yi.dai on 2018/4/12.
 */
import {ADD_COMMENT_SUCCESS, GET_COMMENTS_SUCCESS} from '../actions/index';

const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT_SUCCESS:
            return Object.assign({}, state, {'data': action.data});
        case GET_COMMENTS_SUCCESS:
            return Object.assign({}, state, {'data': action.data});
        default:
            return state;
    }
};

export default commentReducer;