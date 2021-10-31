import { notebookFileName, userStorage } from '../../components/Shared/defaults';

export const fetchNotebookFile = () => {
  return (dispatch) => {
    const options = { decrypt: true };
    userStorage.getFile(notebookFileName, options)
      .then((res) => {
        const notebookFileData = JSON.parse(res);
        dispatch({
          type: 'NOTEBOOK_FILE_FETCH_SUCCESS',
          payload: notebookFileData
        });
      })
      .catch((err) => {
        console.debug(`Error while fetching ${notebookFileName}`);
        if(err.code === "does_not_exist") {
          console.debug(`Creating new ${notebookFileName}`);
          const newOptions = { encrypt: true };
          const initialNotebookData = {
            data: []
          };
          userStorage
            .putFile(notebookFileName, JSON.stringify(initialNotebookData), newOptions)
              .then(() => {
                dispatch({
                  type: 'NOTEBOOK_FILE_FETCH_SUCCESS',
                  payload: initialNotebookData
                })
              })
              .catch((err) => {
                console.debug(`Error while creating new ${notebookFileName}`, err);
              });
        } else {
          console.debug(err);
        }
      });
  };
};

export const postNotebookFile = (userSession, notebookData) => {
  return (dispatch) => {
    const options = { encrypt: true };
    const allNotesData = {
      data: notebookData
    };

    userStorage
      .putFile(notebookFileName, JSON.stringify(allNotesData), options)
        .then(() => {
          dispatch({
            type: 'NOTEBOOK_FILE_POST_SUCCESS',
            payload: allNotesData
          });
        })
        .catch((err) => {
          console.debug(`Error while pushing ${notebookFileName}`, err);
        });
  };
};