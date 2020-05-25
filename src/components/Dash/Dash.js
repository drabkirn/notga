import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Person } from 'blockstack';

import { appConfig, userSession, isUserSignedIn } from '../Shared/defaults';
import { fetchNotebookFile } from '../../store/actions/notesAction';

function Dash() {
  // Get the Redux Dispatch
  const dispatch = useDispatch();

  // Get the Redux state
  const store = useSelector(store => store);
  const notes = store.notes;
  const notesData = notes.notesData;

  useEffect(() => {
    if(isUserSignedIn && !notesData) dispatch(fetchNotebookFile(userSession));
  }, [notesData]);

  if(!isUserSignedIn) {
    return <Redirect to="/login" />;
  }

  const handleSignout = (e) => {
    e.preventDefault();
    userSession.signUserOut();
    window.location = appConfig.redirectURI();
  };

  const userData = userSession.loadUserData();
  const userProfile = new Person(userData.profile);
  const username = userData.username;
  const userFullName = userProfile.name() ? userProfile.name() : "Anonymous Dragon";
  const userDescription = userProfile.description() ? userProfile.description() : "I'm just a Anonymous Dragon writing my notes over here";
  const userAvatarURL = userProfile.avatarUrl() ? userProfile.avatarUrl() : `${appConfig.appDomain}/icons/avatar.png`;

  const NotesLoading = notes.isFetching;

  return(
    <div>
      <h3>This is Dash page</h3>
      <button onClick={ (e) => handleSignout(e) }>Signout</button>
      <div>
        <p>Your info:</p>
        <p>{ username }</p>
        <p>{ userFullName }</p>
        <p>{ userDescription }</p>
        <img src={ userAvatarURL } alt="my avatar" width="250" height="250" />
      </div>

      {
        NotesLoading ? ("loading...") : (
          <div>
            <Link to="/new">New Note</Link>

            <p>Below are your notes:</p>
            <ul>
              {
                notesData && notesData.map((note) => {
                  return(
                    <React.Fragment key={note.id}>
                      <li>
                        <Link to={ "/show/" + note.id }>{ note.title }</Link> | <Link to={ "/edit/" + note.id }>Edit</Link>
                      </li>
                    </React.Fragment>
                  );
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default Dash;