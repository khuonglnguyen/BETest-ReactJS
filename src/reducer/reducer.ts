import { combineReducers } from 'redux';
import { selectorsReducer } from './selector.reducer';
import { COOKIES } from '@constants/cookies';

const rootReducer = combineReducers({
  selectorsReducer,
});

export default rootReducer;
