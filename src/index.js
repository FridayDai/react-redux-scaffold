import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import Login from './containers/Login';
// import Brain from './containers/Brain';

const rootElement = document.getElementById('container');

const HomePage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/HomePage.js').default)
    },'HomePage')
};

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Login} />
                <Route path='homepage' getComponent={HomePage} />
                {/* <Route path='brain' component={Brain} /> */}
                {/* <Route path='test' component={Test} /> */}
            </Route>
        </Router>
    </Provider>,
    rootElement
);