// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import videos from './videos';

const rootReducer = combineReducers({
  videos,
  router,
});

export default rootReducer;
