import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import Doc from './containers/Doc';

const rootElement = document.getElementById('container');

const HomePage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/HomePage.js').default)
    },'HomePage')
};
// const Doc = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('./containers/Doc.js').default)
//     },'Doc')
// };

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Login} />
                <Route path='homepage' getComponent={HomePage} />
                <Route path='/:id' component={Doc} />
                {/* <Route path='test' component={Test} /> */}
            </Route>
        </Router>
    </Provider>,
    rootElement
);