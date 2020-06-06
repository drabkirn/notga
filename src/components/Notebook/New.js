import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EasyMDE from 'easymde';

import { userSession, isUserSignedIn, easyMDEOptions } from '../Shared/defaults';
import generateUUID from '../Shared/generateUUID';
import { fetchNotebookFile, postNotebookFile } from '../../store/actions/notesAction';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

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

    if(isUserSignedIn && notesData) handleEasyMDE();
  }, [notesData]);

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
    <>
      <Navbar />

      <section className="container mt-3rem">
        <form onSubmit={ (e) => handleSubmit(e) } className="form-tag" >
          <div className="form-tag-title-field">
            <input type="text" id="title" name="title" value={ noteTitle } onChange={ (e) => setNoteTitle(e.target.value) } minLength="3" maxLength="25" required placeholder="Note Title" className="validate" />
          </div>

          <div className="mt-3rem">
            <textarea id="noteContent"></textarea>
          </div>

          <div className="center-align mt-2rem">
            <button type="submit" className="btn forest-green-btn">
              Create
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>

        <div className="center-align mt-2rem">
          <Link to="/dash" className="btn apple-red-btn back-btn">
            Cancel
            <i className="material-icons right">backspace</i>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default New;