import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import App from './containers/App';
// import Login from './containers/Login';
import Comment from './containers/Comment';
import WriteDoc from './containers/WriteDoc';
import Loadable from 'react-loadable';
import Loading from './components/Common/Loading';
import Sort from './util/Sort';
import BSTree from './util/Tree';

const rootElement = document.getElementById('container');

const App = Loadable({
    loader: () => import('./containers/App.js'),
    loading: Loading
});

const Login = Loadable({
    loader: () => import('./containers/Login.js'),
    loading: Loading
});

const HomePage = Loadable({
    loader: () => import('./containers/HomePage.js'),
    loading: Loading
});

const Doc = Loadable({
    loader: () => import('./containers/Doc.js'),
    loading: Loading
});

const Profile = Loadable({
    loader: () => import('./containers/Profile.js'),
    loading: Loading
});

// const Profile = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('./containers/Profile.js').default)
//     },'Profile')
// };

const a = new BSTree();
a.add(5);
a.add(1);
a.add(6);
a.add(3);

console.log(a.getMax());
console.log(a.getMin());

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Login} />
                <Route path='/homepage' component={HomePage} />
                <Route path='/writeDoc' component={WriteDoc} />
                <Route path='/profile' component={Profile} />
                <Route path='/comment' component={Comment} />
                <Route path='/:id' component={Doc} />
            </Route>
        </Router>
    </Provider>,
    rootElement
);