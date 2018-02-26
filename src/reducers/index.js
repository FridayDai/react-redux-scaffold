/**
 * Created by yi.dai on 2018/1/4.
 */
import {combineReducers} from 'redux';
import {fetchTopicsReducer} from './reducers';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({fetchTopicsReducer, loginReducer});

export default rootReducer;