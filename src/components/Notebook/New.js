import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EasyMDE from 'easymde';

import { userSession, isUserSignedIn } from '../Shared/defaults';
import { easyMDEOptions } from '../Shared/defaults';
import generateUUID from '../Shared/generateUUID';
import { fetchNotebookFile, postNotebookFile } from '../../store/actions/notesAction';

import 'easymde/dist/easymde.min.css';

function New() {
  // Get the Redux Dispatch
  const dispatch = useDispatch();

  // Get the Redux state
  const store = useSelector(store => store);
  const notes = store.notes;
  const notesData = notes.notesData;
  
  const [noteId] = useState(generateUUID());
  const [noteTitle, setNoteTitle] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if(isUserSignedIn && !notesData) dispatch(fetchNotebookFile(userSession));
  }, [notesData]);

  useEffect(() => {
    if(isUserSignedIn) handleEasyMDE();
  }, []);

  if(!isUserSignedIn) {
    return <Redirect to="/login" />;
  }

  const handleEasyMDE = () => {
    const noteContentElement = document.getElementById('noteContent');
    const updatedEasyMDEOptions = {...easyMDEOptions, element: noteContentElement};
    new EasyMDE(updatedEasyMDEOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteContentElement = document.getElementById('noteContent');
    const noteData = {
      id: noteId,
      title: noteTitle,
      content: noteContentElement.value,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    };
    notesData.push(noteData);
    dispatch(postNotebookFile(userSession, notesData));
    setIsFormSubmitted(true);
  };

  if(isFormSubmitted) {
    return <Redirect to={ "/show/" + noteId } />;
  }

  return(
    <div>
      <h3>This is New page</h3>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={ noteTitle } onChange={ (e) => setNoteTitle(e.target.value) } minLength="3" maxLength="30" required />
        </div>

        <div>
          <textarea id="noteContent"></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default New;