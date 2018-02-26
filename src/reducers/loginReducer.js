/**
 * Created by yi.dai on 2018/2/26.
 */
import {LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/index';

const loginActionReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, action.data || {});
        case LOGIN_FAIL:
            return Object.assign({}, state, action.data || {});
        default:
            return state;
    }
};

export default loginActionReducer;