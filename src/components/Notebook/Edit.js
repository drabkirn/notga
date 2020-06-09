import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EasyMDE from 'easymde';

import { userSession, isUserSignedIn, easyMDEOptions, handleImagesRender } from '../Shared/defaults';
import generateUUID from '../Shared/generateUUID';
import { fetchNotebookFile, postNotebookFile } from '../../store/actions/notesAction';
import { fetchTagsFile, postTagsFile } from '../../store/actions/tagsAction';
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

  const tags = store.tags;
  const tagsData = tags.tagsData;

  const noteIdParam = props.match.params.id;

  const [note, setNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [initialNoteTags, setInitialNoteTags] = useState("");
  const [noteNotFound, setNoteNotFound] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if(isUserSignedIn && !notesData) dispatch(fetchNotebookFile(userSession));

    if(isUserSignedIn && !tagsData) dispatch(fetchTagsFile(userSession));

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

    if(isUserSignedIn && notesData && tagsData) {
      const getCurrentNote = notesData.filter((note) => note.id === noteIdParam)[0];
      const allTags = [];

      tagsData.forEach((tagData) => {
        if(tagData.note_ids.includes(getCurrentNote.id)) {
          allTags.push(tagData.name);
        }
      });
      setInitialNoteTags(allTags);
      setNoteTags(allTags.join(", "));
    }
  }, [notesData, tagsData]);

  useEffect(() => {
    if(note) {
      handleEasyMDE(note);
    }
  }, [note]);

  const handleEasyMDE = (note) => {
    const noteContentElement = document.getElementById('noteContent');
    const updatedEasyMDEOptions = {...easyMDEOptions, element: noteContentElement, initialValue: note.content, previewRender: (text) => customMarkdownRender(text)};
    new EasyMDE(updatedEasyMDEOptions);

    const noteContentElement1 = document.getElementById('noteContent1');
    const updatedEasyMDEOptions1 = {...easyMDEOptions, element: noteContentElement1, initialValue: note.content };
    const myEasyMDE1 = new EasyMDE(updatedEasyMDEOptions1);
    myEasyMDE1.toTextArea();

    const customMarkdownRender = (text) => {
      setTimeout(() => {
        handleImagesRender(userSession);
      }, 1000);
      return myEasyMDE1.options.previewRender(text);
    };
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
          note_ids: [note.id]
        };
        tagsData.push(tagData);
      });
    } else {
      if(initialNoteTags.length > processedTagsArr.length) {
        let deletedTags = initialNoteTags.filter((nT) => !processedTagsArr.includes(nT));
        deletedTags.forEach((dTagName) => {
          tagsData.forEach((tData) => {
            if(tData.name === dTagName) {
              const idx = tData.note_ids.indexOf(note.id);
              tData.note_ids.splice(idx, 1);
            }
          });
        });
      }

      processedTagsArr.forEach((pTagName) => {
        let updatedPTagName = false;
        tagsData.forEach((tData) => {
          if(tData.name === pTagName) {
            if(!tData.note_ids.includes(note.id)) {
              tData.note_ids.push(note.id);
              updatedPTagName = true;
              return;
            } else {
              updatedPTagName = true;
            }
          }
        });

        if(!updatedPTagName) {
          const tagData = {
            id: generateUUID(),
            name: pTagName,
            note_ids: [note.id]
          };
          tagsData.push(tagData);
        }
      });
    }
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

                <div>
                  <textarea id="noteContent1" style={ { visibility: "hidden" }}></textarea>
                </div>

                <div className="form-tag-title-field">
                  <input type="text" id="tags" name="tags" value={ noteTags } onChange={ (e) => setNoteTags(e.target.value) } placeholder="Tag 1, Tag 2" className="validate" />
                </div>

                <div className="center-align mt-2rem">
                  <button type="submit" className="btn forest-green-btn">
                    Update
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>

              <div className="center-align mt-2rem">
                <Link to={ "/show/" + note.id } className="btn apple-red-btn back-btn">
                  Cancel
                  <i className="material-icons right">backspace</i>
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