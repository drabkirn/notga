import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EasyMDE from 'easymde';

import { userSession, isUserSignedIn, easyMDEOptions } from '../Shared/defaults';
import { fetchNotebookFile, postNotebookFile } from '../../store/actions/notesAction';
import Navbar from '../Shared/Navbar';
import Loading from '../Shared/Loading';
import Footer from '../Shared/Footer';

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
    <>
      <Navbar />

      <section className="container mt-3rem">
        {
          loading || !note ? (
            <Loading />
          ) : (
            <>
              <form onSubmit={ (e) => handleSubmit(e) } className="form-tag" >
                <div className="form-tag-title-field">
                  <input type="text" id="title" name="title" value={ noteTitle } onChange={ (e) => setNoteTitle(e.target.value) } minLength="3" maxLength="25" required placeholder="Note Title" className="validate" />
                </div>

                <div className="mt-3rem">
                  <textarea id="noteContent"></textarea>
                </div>

                <div className="center-align mt-2rem">
                  <button type="submit" className="btn forest-green-btn">
                    Update
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </form>

              <div className="center-align mt-2rem">
                <Link to={ "/show/" + note.id } className="btn apple-red-btn">
                  Cancel
                  <i class="material-icons right">backspace</i>
                </Link>
              </div>
            </>
          )
        }
      </section>

      <Footer />
    </>
  );
};

export default Edit;