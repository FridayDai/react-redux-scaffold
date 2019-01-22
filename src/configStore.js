/**
 * Created by yi.dai on 2018/1/4.
 */
import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const enhancer = compose(applyMiddleware(thunk, createLogger));

export default createStore(reducer, enhancer);
