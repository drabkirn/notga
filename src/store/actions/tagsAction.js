import { tagsFileName, userStorage } from '../../components/Shared/defaults';

export const fetchTagsFile = () => {
  return (dispatch) => {
    const options = { decrypt: true };
    userStorage.getFile(tagsFileName, options)
      .then((res) => {
        const tagsFileData = JSON.parse(res);
        dispatch({
          type: 'TAGS_FILE_FETCH_SUCCESS',
          payload: tagsFileData
        });
      })
      .catch((err) => {
        console.debug(`Error while fetching ${tagsFileName}`);
        if(err.code === "does_not_exist") {
          console.debug(`Creating new ${tagsFileName}`);
          const newOptions = { encrypt: true };
          const initialTagsData = {
            data: []
          };
          userStorage
            .putFile(tagsFileName, JSON.stringify(initialTagsData), newOptions)
              .then(() => {
                dispatch({
                  type: 'TAGS_FILE_FETCH_SUCCESS',
                  payload: initialTagsData
                })
              })
              .catch((err) => {
                console.debug(`Error while creating new ${tagsFileName}`, err);
              });
        } else {
          console.debug(err);
        }
      });
  };
};

export const postTagsFile = (userSession, tagsData) => {
  return (dispatch) => {
    const options = { encrypt: true };
    const allTagsData = {
      data: tagsData
    };

    userStorage
      .putFile(tagsFileName, JSON.stringify(allTagsData), options)
        .then(() => {
          dispatch({
            type: 'TAGS_FILE_POST_SUCCESS',
            payload: allTagsData
          });
        })
        .catch((err) => {
          console.debug(`Error while pushing ${tagsFileName}`, err);
        });
  };
};