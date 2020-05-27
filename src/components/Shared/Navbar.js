import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from "materialize-css";

import { appConfig, userSession, isUserSignedIn } from './defaults';

function Navbar() {
  const [sideNavInstance, setSideNavInstance] = useState(null);

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    const options = {};
    const instances = M.Sidenav.init(elems, options);
    setSideNavInstance(instances[0]);
  }, []);

  const logoLink = isUserSignedIn ? "/dash" : "/";

  const handleSideNav = () => {
    sideNavInstance.close();
  }

  const handleSignout = (e) => {
    e.preventDefault();
    userSession.signUserOut();
    window.location = appConfig.redirectURI();
  }

  return(
    <React.Fragment>
      <nav className="honey-dew-bg custom-nav">
        <div className="nav-wrapper">
          <Link to={ logoLink } className="brand-logo rich-black-text ml-2rem" >
            <h4>Notga</h4>
          </Link>
          <a href="#!" data-target="mobile-demo" className="sidenav-trigger rich-black-text"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            {
              isUserSignedIn ? (
                <>
                  <li><Link to="/#tour">Tour</Link></li>
                  <li><Link to="/dash">Dash</Link></li>
                  <li><Link to="#" onClick={ (e) => handleSignout(e) }>Sign out</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/#tour">Tour</Link></li>
                  <li><Link to="/login">Get started</Link></li>
                </>
              )
            }
          </ul>
        </div>
      </nav>

      <ul className="sidenav custom-sidenav" id="mobile-demo">
        {
          isUserSignedIn ? (
            <>
              <li><Link to="/#tour" onClick={ () => handleSideNav() }>Tour</Link></li>
              <li><Link to="/dash" onClick={ () => handleSideNav() }>Dash</Link></li>
              <li><Link to="#" onClick={ (e) => handleSignout(e) }>Sign out</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/#tour" onClick={ () => handleSideNav() }>Tour</Link></li>
              <li><Link to="/login" onClick={ () => handleSideNav() }>Get started</Link></li>
            </>
          )
        }
      </ul>
    </React.Fragment>
  );
};

export default Navbar;