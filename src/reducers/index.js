/**
 * Created by yi.dai on 2018/1/4.
 */
import {combineReducers} from 'redux';
import fetchTopicsReducer from './reducers.js';

const rootReducer = combineReducers({fetchTopicsReducer});

export default rootReducer;