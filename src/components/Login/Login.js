import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { appConfig, userSession, isUserSignedIn, loginPopup } from '../Shared/defaults';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

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
          .catch((err) => {
            console.debug("Cannot sign you in", err);
          });
    }
  }, []);

  if(isUserSignedIn) {
    return <Redirect to="/dash" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Deprecated
    // userSession.redirectToSignIn();

    const authOptions = {
      redirectTo: '/dash',
      onFinish: (authData) => {
        window.location = appConfig.redirectURI();
      },
      onCancel: () => {
        setLoading(false);
      },
      manifestPath: `${ appConfig.redirectURI() }/manifest.json`,
      appDetails: {
        name: 'Notga',
        icon: `${ appConfig.redirectURI().slice(0, (appConfig.redirectURI().length - 6)) }/icons/logo-180x180.png`,
      },
    };

    loginPopup(authOptions);
  };

  return(
    <React.Fragment>
      <Navbar />

      <section className="container">
        <div className="login-section center-align">
          <div>
            <p className="italic">
              Get started by signing in with Blockstack. If you don't have one, you can create a new one. It's super fast and straightforward.
            </p>
          </div>
          <div>
            <button className="btn btn-large oxford-blue-btn" onClick={ (e) => handleLogin(e) } disabled={ loading } >
              { loading ? "Signing you in..." : "Sign in with Blockstack" }
              <i className="material-icons right">fingerprint</i>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default Login;