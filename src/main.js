import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { store } from './actions/index';

import App from './containers/app';
import Form from './containers/form';
import Success from './containers/success';

import './styles.less';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Form}/>
      <Route path="success" component={Success}/>
    </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
