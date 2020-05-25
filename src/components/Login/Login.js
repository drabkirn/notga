import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { appConfig, userSession, isUserSignedIn } from '../Shared/defaults';

function Login() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(userSession.isSignInPending()) {
      setLoading(true);
      userSession
        .handlePendingSignIn()
          .then(() => {
            window.location = appConfig.redirectURI();
          })
          .catch(err => console.debug("Cannot sign you in", err));
    }
  }, []);

  if(isUserSignedIn) {
    return <Redirect to="/dash" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    userSession.redirectToSignIn();
  };

  return(
    <div>
      <button onClick={ (e) => handleLogin(e) } disabled={ loading } >Sign in with Blockstack</button>
    </div>
  );
};

export default Login;