import 'file?name=[name].[ext]!../serviceworker.js';
import 'file?name=[name].[ext]!../serviceworker-cache-polyfill.js';

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { homeReducer } from './reducers/reducers';
import FontFaceObserver from 'fontfaceobserver';

import HomePage from './components/pages/HomePage.react';
import LoginPage from './components/pages/LoginPage.react';
import RegisterPage from './components/pages/RegisterPage.react';
import Editor from './components/pages/Editor.react';
import NotFound from './components/pages/NotFound.react';
import App from './components/App.react';

import '../css/main.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js').then(() => {
  }).catch((err) => {
    console.log('ServiceWorker registration failed, error:', err);
  });
} else {
  console.log('ServiceWorker is not supported in this browser');
}

const openSansObserver = new FontFaceObserver('Open Sans');

openSansObserver.check().then(() => {
  document.body.classList.add('js-open-sans-loaded');
}, (err) => {
  document.body.classList.remove('js-open-sans-loaded');
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);
console.log(store.getState());

function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();

  if (nextState.location.pathname !== '/editor') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  } else {
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={HomePage} />
        <Route onEnter={checkAuth}>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/editor" component={Editor} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
