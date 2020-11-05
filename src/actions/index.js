import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { doApiGet } from '../shared/api';

import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';

const middleware = routerMiddleware(hashHistory);

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, middleware)
);

export function loadedCoordinator(coordinator) {
  return {
    type: 'LOADED_COORDINATOR',
    coordinator
  }
}

//thunks

export function loadCoordinator() {
  return (dispatch) => {
    console.log('[loadCoordinator]');
    doApiGet('5bcdd7992f00006300c855d5').then((data)=>{
      console.log('loadedCoordinator', data.data);
      const coordinator = [...data.data];
      dispatch(loadedCoordinator(coordinator));
    }).catch((error) => {
      console.log('loadCoordinator error', error);
    })
  }
}
