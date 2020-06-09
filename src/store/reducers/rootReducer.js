import notesReducer from './notesReducer';
import tagsReducer from './tagsReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer
});

export default rootReducer;