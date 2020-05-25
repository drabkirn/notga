import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EasyMDE from 'easymde';

import { userSession, isUserSignedIn, easyMDEOptions } from '../Shared/defaults';
import Highlight from '../Shared/Highlight';
import { fetchNotebookFile } from '../../store/actions/notesAction';

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
  };

  if(!isUserSignedIn) {
    return <Redirect to="/login" />;
  }

  if(noteNotFound) {
    return <Redirect to="/dash" />
  }

  const loading = notes.isFetching;

  return(
    <div>
      <h3>This is Show page</h3>
      {
        loading || !note ? ("loading...") : (
          <div>
            <p>Title: { note.title }</p>

            <div className="editor-preview editor-preview-side editor-preview-active-side" style={{ position: "static", width: "100%", marginTop: "20px" }}>
              <Highlight content={ noteContentRender }></Highlight>
            </div>

            <Link to={ "/edit/" + note.id }>Edit</Link>
          </div>
        )
      }

      <div>
        <textarea name="noteContent" id="noteContent" style={ { visibility: "hidden" } }></textarea>
      </div>
    </div>
  );
};

export default Show;