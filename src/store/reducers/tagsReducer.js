let initState = {
  isFetching: true,
  tagsData: null,
  err: null
};

const tagsReducer = (state = initState, action) => {
  switch (action.type){
    case 'TAGS_FILE_FETCH_SUCCESS':
      return {
        ...state,
        tagsData: action.payload.data,
        isFetching: false
      };
    case 'TAGS_FILE_POST_SUCCESS':
      return {
        ...state,
        tagsData: action.payload.data,
        isFetching: false
      };
    default:
      return state;
  }
};


export default tagsReducer;