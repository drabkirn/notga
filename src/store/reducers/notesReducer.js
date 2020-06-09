let initState = {
  isFetching: true,
  notesData: null,
  err: null
};

const notesReducer = (state = initState, action) => {
  switch (action.type){
    case 'NOTEBOOK_FILE_FETCH_SUCCESS':
      return {
        ...state,
        notesData: action.payload.data,
        isFetching: false
      };
    case 'NOTEBOOK_FILE_POST_SUCCESS':
      return {
        ...state,
        notesData: action.payload.data,
        isFetching: false
      };
    default:
      return state;
  }
};


export default notesReducer;