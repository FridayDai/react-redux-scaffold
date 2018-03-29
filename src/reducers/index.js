/**
 * Created by yi.dai on 2018/1/4.
 */
import {combineReducers} from 'redux';
import {fetchTopicsReducer} from './reducers';
import loginReducer from './loginReducer';
import docReducer from './docReducer';

const rootReducer = combineReducers({fetchTopicsReducer, loginReducer, docReducer});

export default rootReducer;