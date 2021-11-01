import React, { useEffect, createRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Person } from 'blockstack';
import M from "materialize-css";

import { appConfig, userSession, isUserSignedIn } from '../Shared/defaults';
import { fetchNotebookFile } from '../../store/actions/notesAction';
import { fetchTagsFile } from '../../store/actions/tagsAction';
import Navbar from '../Shared/Navbar';
import Loading from '../Shared/Loading';
import FloatingIcon from '../Shared/FloatingIcon';
import Footer from '../Shared/Footer';

function Dash() {
  // Get the Redux Dispatch
  const dispatch = useDispatch();

  // Get the Redux state
  const store = useSelector(store => store);
  const notes = store.notes;
  const notesData = notes.notesData;

  const tags = store.tags;
  const tagsData = tags.tagsData;

  const tagNameRef = createRef();

  const [tagNotes, setTagNotes] = useState(null);

  useEffect(() => {
    if(isUserSignedIn && !notesData) dispatch(fetchNotebookFile());

    if(isUserSignedIn && !tagsData) dispatch(fetchTagsFile());

    if(isUserSignedIn && notesData) {
      document.addEventListener('keydown', keyboardShortcutsHandler);

      return () => {
        document.removeEventListener('keydown', keyboardShortcutsHandler);
      }
    }
  }, [notesData, tagsData]);

  useEffect(() => {
    if(isUserSignedIn && notesData && tagsData) {
      const elems = document.querySelectorAll('.autocomplete');
      const options = {
        data: {},
        limit: 10,
        onAutocomplete: (val) => {
          handleTagSearchSubmit(null, val);
        }
      };
      tagsData.forEach((tD) => {
        options.data[tD.name] = null;
      });
      const instances = M.Autocomplete.init(elems, options);
    }
  }, [notesData, tagsData]);

  const keyboardShortcutsHandler = (e) => {
    if(e.key < 1 && e.key > 9) {
      return;
    }

    if((e.key > 0 && e.key < 10) && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const dncIndex = document.querySelector(`.dnc-${e.key}`);
  
      if(dncIndex) dncIndex.click();
    }
  };

  const handleTagSearchSubmit = (e, tempVal) => {
    if(e) e.preventDefault();
    const tagName = tagNameRef.current ? tagNameRef.current.value : tempVal;
    const noteIDS = [];
    const customTagNotes = [];
    tagsData.forEach((tagData) => {
      if(tagData.name.includes(tagName)) {
        noteIDS.push(...tagData.note_ids);
      }
    });
    if(noteIDS.length !== 0) {
      notesData.forEach((noteData) => {
        if(noteIDS.includes(noteData.id)) {
          customTagNotes.push(noteData);
        }
      });

      setTagNotes(customTagNotes);
    } else {
      setTagNotes(null);
    }
  };

  const handleTagSearchClear = (e) => {
    e.preventDefault();
    setTagNotes(null);
    tagNameRef.current.value = "";
  };

  if(!isUserSignedIn) {
    return <Redirect to="/login" />;
  }

  const userData = userSession.loadUserData();
  const userProfile = new Person(userData.profile);
  const username = userData.username;
  const usernameorFullName = userProfile.name() ? userProfile.name() : username;
  const userAvatarURL = userProfile.avatarUrl() ? userProfile.avatarUrl() : `${appConfig.appDomain}/icons/avatar.png`;

  const NotesLoading = notes.isFetching;

  return(
    <>
      <Navbar />

      <section className="container center-align mt-3rem">
        <div>
          <h2>Dashboard</h2>
        </div>

        <div>
          <img src={ userAvatarURL } alt="my avatar" className="profile-avatar" />
          <p className="fs-1-2 bold">Welcome, { usernameorFullName ? usernameorFullName : 'Baaaaaa' }!</p>
          <a href="https://browser.blockstack.org/profiles" target="_blank" rel="noopener noreferrer" className="btn forest-green-btn">
            Edit Profile
            <i className="material-icons right">edit</i>
          </a>
        </div>
      </section>

      <div className="container">
        <hr />
      </div>

      <section className="container mb-10rem">
        {
          NotesLoading ? (
            <Loading />
          ) : (
            <>
              <div className="center-align">
                <h2>Your notes</h2>
              </div>

              {
                notesData.length === 0 ? (
                  <div className="row">
                    <div className="col m6 offset-m3 s12">
                      <p className="fs-1-1">It's lonely over here, start writing a new note by click on + icon from bottom right...</p>
                      <img src="/notga/images/illustrations/lonely.svg" alt="lonely illustration" className="responsive-img" />
                    </div>
                  </div>
                ) : (<></>)
              }

              {
                tagsData && tagsData.length !== 0 ? (
                  <section>
                    <div className="row">
                      <form className="col s12 m8 offset-m2 l8 offset-l3" onSubmit={ (e) => handleTagSearchSubmit(e, null) }>
                        <div className="row">
                          <div className="input-field col s7">
                            <i className="material-icons prefix">timeline</i>
                            <input type="text" id="autocomplete-input" className="autocomplete" autoComplete="off" ref={ tagNameRef } />
                            <label htmlFor="autocomplete-input">Tags</label>
                          </div>

                          <div className="col s5">
                            <button type="submit" className="btn forest-green-btn dash-tag-submit-btn">
                              <i className="material-icons right">search</i>
                            </button>
                            <button className="btn apple-red-btn dash-tag-submit-btn" onClick={ (e) => handleTagSearchClear(e) }>
                              <i className="material-icons right">clear</i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </section>
                ) : ("")
              }

              <div className="row mt-2rem dash-notes">
                {
                  notesData && !tagNotes && notesData.map((note, index) => {
                    return(
                      <div key={note.id} className="col s12 m4 dash-notes-col-m4-nth-clear">
                        <Link to={ "/show/" + note.id } className={ "dash-notes-card center-align dnc-" + (index + 1) }>
                          <p className="fs-1-1 bold uppercase">{ note.title }</p>
                          <p>
                            {
                              tagsData && tagsData.map((tagData, idx) => {
                                return tagData.note_ids.includes(note.id) ? (
                                  <span key={ idx } className="dash-note-tags">{ tagData.name }</span>
                                ) : ("")
                              })
                            }
                          </p>
                        </Link>
                      </div>
                    );
                  })
                }

                {
                  notesData && tagNotes && tagNotes.map((note, index) => {
                    return(
                      <div key={note.id} className="col s12 m4 dash-notes-col-m4-nth-clear">
                        <Link to={ "/show/" + note.id } className={ "dash-notes-card center-align dnc-" + (index + 1) }>
                          <p className="fs-1-1 bold uppercase">{ note.title }</p>
                          <p>
                            {
                              tagsData && tagsData.map((tagData, idx) => {
                                return tagData.note_ids.includes(note.id) ? (
                                  <span key={ idx } className="dash-note-tags">{ tagData.name }</span>
                                ) : ("")
                              })
                            }
                          </p>
                        </Link>
                      </div>
                    );
                  })
                }
                
              </div>
            </>
          )
        }
      </section>

      <FloatingIcon />

      <Footer />
    </>
  );
};

export default Dash;