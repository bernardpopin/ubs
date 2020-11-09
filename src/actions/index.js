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

export function loadedResponsible(responsible) {
  return {
    type: 'LOADED_RESPONSIBLE',
    responsible
  }
}

export function loadedCategory(category) {
  return {
    type: 'LOADED_CATEGORY',
    category
  }
}

export function savedToForm(value) {
  return {
    type: 'SAVED_TO_FORM',
    value
  }
}

//thunks

export function loadResponsible() {
  return (dispatch) => {
    console.log('[loadResponsible]');
    doApiGet('5bcdd7992f00006300c855d5').then((data)=>{
      console.log('loadedResponsible', data.data);
      const responsible = [...data.data];
      dispatch(loadedResponsible(responsible));
    }).catch((error) => {
      console.log('loadResponsible error', error);
    })
  }
}

export function loadCategory() {
  return (dispatch) => {
    console.log('[loadCategory]');
    doApiGet('5bcdd3942f00002c00c855ba').then((data)=>{
      console.log('loadedCategory', data.data);
      const category = [...data.data];
      dispatch(loadedCategory(category));
    }).catch((error) => {
      console.log('loadCategory error', error);
    })
  }
}

export function saveToForm(value) {
  return (dispatch) => {
    console.log('[saveToForm]');
    dispatch(savedToForm(value));
  }
}
