import notesReducer from './notesReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  notes: notesReducer
});

export default rootReducer;