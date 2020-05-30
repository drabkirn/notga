import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EasyMDE from 'easymde';

import { appConfig, userSession, isUserSignedIn, easyMDEOptions, handleImagesRender } from '../Shared/defaults';
import Highlight from '../Shared/Highlight';
import { fetchNotebookFile, postNotebookFile } from '../../store/actions/notesAction';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';
import FloatingIcon from '../Shared/FloatingIcon';
import Footer from '../Shared/Footer';

import 'easymde/dist/easymde.min.css';

function Show(props) {
  // Get the Redux Dispatch
  const dispatch = useDispatch();

  // Get the Redux state
  const store = useSelector(store => store);
  const notes = store.notes;
  const notesData = notes.notesData;

  const noteIdParam = props.match.params.id;
  
  const [noteContentRender, setNoteContentRender] = useState(null);
  const [note, setNote] = useState(null);
  const [noteNotFound, setNoteNotFound] = useState(false);

  useEffect(() => {
    if(isUserSignedIn && !notesData) dispatch(fetchNotebookFile(userSession));

    if(isUserSignedIn && notesData) {
      const getCurrentNote = notesData.filter((note) => note.id === noteIdParam)[0];

      if(getCurrentNote) {
        setNote(getCurrentNote);
        handleEasyMDE(getCurrentNote);
      } else {
        setNote(null);
        setNoteNotFound(true);
      }
    }
  }, [notesData]);

  const handleEasyMDE = (note) => {
    const noteContentElement = document.getElementById('noteContent');
    const updatedEasyMDEOptions = {...easyMDEOptions, element: noteContentElement, initialValue: note.content};
    const myEasyMDE = new EasyMDE(updatedEasyMDEOptions);
    setNoteContentRender(myEasyMDE.options.previewRender(myEasyMDE.value()));
    myEasyMDE.toTextArea();

    setTimeout(() => {
      handleImagesRender(userSession);
    }, 2000);
  };

  const handleNoteDelete = (deletedNote) => {
    const confirmDeletion = window.confirm("Are ou sure, you want to delete this note, it's irreversible?");
    if(confirmDeletion) {
      const modifiedNotesData = notesData.filter((note) => note.id !== deletedNote.id);
      dispatch(postNotebookFile(userSession, modifiedNotesData));
      window.location = appConfig.redirectURI();
    }
  };

  if(!isUserSignedIn) {
    return <Redirect to="/login" />;
  }

  if(noteNotFound) {
    return <Redirect to="/dash" />
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
              <div className="center-align">
                <h2>{ note.title }</h2>
              </div>

              <div className="show-note-metadata center-align">
                <p>Created at: { note.created_at }</p>
                <p>Updated at: { note.updated_at }</p>
              </div>

              <div className="mt-2rem center-align">
                <Link to={ "/edit/" + note.id } className="btn forest-green-btn">
                  Edit
                  <i className="material-icons right">edit</i>
                </Link>
                <button className="btn apple-red-btn ml-1rem" onClick={ () => handleNoteDelete(note) }>
                  Delete
                  <i className="material-icons right">delete</i>
                </button>
                <Link to="/dash" className="btn ml-1rem oxford-blue-btn">
                  Back
                  <i className="material-icons right">keyboard_backspace</i>
                </Link>
              </div>

              <div className="editor-preview editor-preview-side editor-preview-active-side custom-editor-preview">
                <Highlight content={ noteContentRender }></Highlight>
              </div>

              <div className="mt-2rem center-align">
                <Link to={ "/edit/" + note.id } className="btn forest-green-btn">
                  Edit
                  <i className="material-icons right">edit</i>
                </Link>
                <button className="btn apple-red-btn ml-1rem" onClick={ () => handleNoteDelete(note) }>
                  Delete
                  <i className="material-icons right">delete</i>
                </button>
                <Link to="/dash" className="btn ml-1rem oxford-blue-btn">
                  Back
                  <i className="material-icons right">keyboard_backspace</i>
                </Link>
              </div>
            </>
          )
        }
        
        <div>
          <textarea name="noteContent" id="noteContent" style={ { visibility: "hidden" } }></textarea>
        </div>
      </section>

      <FloatingIcon />

      <Footer />
    </>
  );
};

export default Show;