import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EasyMDE from 'easymde';

import { userSession, isUserSignedIn, easyMDEOptions } from '../Shared/defaults';
import generateUUID from '../Shared/generateUUID';
import { fetchNotebookFile, postNotebookFile } from '../../store/actions/notesAction';
import { fetchTagsFile, postTagsFile } from '../../store/actions/tagsAction';
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

  const tags = store.tags;
  const tagsData = tags.tagsData;
  
  const [noteId] = useState(generateUUID());
  const [noteTitle, setNoteTitle] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if(isUserSignedIn && !notesData) dispatch(fetchNotebookFile(userSession));

    if(isUserSignedIn && !tagsData) dispatch(fetchTagsFile(userSession));

    if(isUserSignedIn && notesData && tagsData) {
      handleEasyMDE();
    }
  }, [notesData, tagsData]);

  if(!isUserSignedIn) {
    return <Redirect to="/login" />;
  }

  const handleEasyMDE = () => {
    const noteContentElement = document.getElementById('noteContent');
    const isMDEInited = document.querySelector('.editor-toolbar');
    const updatedEasyMDEOptions = {...easyMDEOptions, element: noteContentElement};

    if(!isMDEInited) new EasyMDE(updatedEasyMDEOptions);
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

    handleTagsData();

    dispatch(postNotebookFile(userSession, notesData));
    dispatch(postTagsFile(userSession, tagsData));
    setIsFormSubmitted(true);
  };

  const handleTagsData = () => {
    const processedTagsArr = noteTags.length > 0 ? [...new Set(noteTags.split(",").map((b) => b.trim().toLowerCase()))] : "";

    if(tagsData.length === 0) {
      processedTagsArr.forEach((pTagName) => {
        const tagData = {
          id: generateUUID(),
          name: pTagName,
          note_ids: [noteId]
        };
        tagsData.push(tagData);
      });
    } else {
      processedTagsArr.forEach((pTagName) => {
        let updatedPTagName = false;
        tagsData.forEach((tData) => {
          if(tData.name === pTagName) {
            tData.note_ids.push(noteId);
            updatedPTagName = true;
          }
        });

        if(!updatedPTagName) {
          const tagData = {
            id: generateUUID(),
            name: pTagName,
            note_ids: [noteId]
          };
          tagsData.push(tagData);
        }
      });
    }
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

          <div className="form-tag-title-field">
            <input type="text" id="tags" name="tags" value={ noteTags } onChange={ (e) => setNoteTags(e.target.value) } placeholder="Tag 1, Tag 2" className="validate" />
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