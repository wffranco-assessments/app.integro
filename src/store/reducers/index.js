import { combineReducers } from 'redux';

import token from './token';
import user from './user';

const reducers = combineReducers({
  token,
  user,
});

export default reducers;
