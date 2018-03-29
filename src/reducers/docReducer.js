/**
 * Created by yi.dai on 2018/3/29.
 */
import {GET_DOC_SUCCESS} from '../actions/index';

const docReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DOC_SUCCESS:
            return Object.assign({}, state, {'docFile': action.data});
        default:
            return state;
    }
};

export default docReducer;