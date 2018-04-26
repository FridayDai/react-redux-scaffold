import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import Comment from './containers/Comment';
import WriteDoc from './containers/WriteDoc';
// import Profile from './containers/Profile';

const rootElement = document.getElementById('container');

const HomePage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/HomePage.js').default)
    },'HomePage')
};
const Doc = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/Doc.js').default)
    },'Doc')
};
const Profile = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/Profile.js').default)
    },'Profile')
};


render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Login} />
                <Route path='/homepage' getComponent={HomePage} />
                <Route path='/writeDoc' component={WriteDoc} />
                <Route path='/profile' getComponent={Profile} />
                <Route path='/comment' component={Comment} />
                <Route path='/:id' getComponent={Doc} />
            </Route>
        </Router>
    </Provider>,
    rootElement
);