import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EasyMDE from 'easymde';

import { userSession, isUserSignedIn, easyMDEOptions } from '../Shared/defaults';
import { fetchNotebookFile, postNotebookFile } from '../../store/actions/notesAction';

import 'easymde/dist/easymde.min.css';

function Edit(props) {
  // Get the Redux Dispatch
  const dispatch = useDispatch();

  // Get the Redux state
  const store = useSelector(store => store);
  const notes = store.notes;
  const notesData = notes.notesData;

  const noteIdParam = props.match.params.id;

  const [note, setNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteNotFound, setNoteNotFound] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if(isUserSignedIn && !notesData) dispatch(fetchNotebookFile(userSession));

    if(isUserSignedIn && notesData) {
      const getCurrentNote = notesData.filter((note) => note.id === noteIdParam)[0];

      if(getCurrentNote) {
        setNote(getCurrentNote);
        setNoteTitle(getCurrentNote.title);
      } else {
        setNote(null);
        setNoteNotFound(true);
      }
    }
  }, [notesData]);

  useEffect(() => {
    if(note) {
      handleEasyMDE(note);
    }
  }, [note]);

  const handleEasyMDE = (note) => {
    const noteContentElement = document.getElementById('noteContent');
    const updatedEasyMDEOptions = {...easyMDEOptions, element: noteContentElement, initialValue: note.content};
    new EasyMDE(updatedEasyMDEOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteContentElement = document.getElementById('noteContent');
    notesData.forEach((eachNote) => {
      if(eachNote.id === note.id) {
        eachNote.title = noteTitle;
        eachNote.content = noteContentElement.value;
        eachNote.updated_at = new Date().toLocaleString();
      }
    });
    dispatch(postNotebookFile(userSession, notesData));
    setIsFormSubmitted(true);
  };

  if(!isUserSignedIn) {
    return <Redirect to="/login" />;
  }

  if(noteNotFound) {
    return <Redirect to="/dash" />
  }

  if(isFormSubmitted) {
    return <Redirect to={ "/show/" + note.id } />;
  }

  const loading = notes.isFetching;

  return(
    <div>
      <h3>This is Edit page</h3>
      {
        loading || !note ? ("loading...") : (
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
        )
      }
    </div>
  );
};

export default Edit;