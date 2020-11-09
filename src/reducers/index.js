import { combineReducers } from 'redux';

import { CoordinatorReducer } from './coordinatorReducer';
import { AboutReducer } from './aboutReducer';
import { FormReducer } from './formReducer';

const rootReducer = combineReducers({
  CoordinatorReducer,
  AboutReducer,
  FormReducer
});

export default rootReducer;
