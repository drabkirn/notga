import React from 'react';

import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

function Home() {
  return(
    <React.Fragment>
      <Navbar />

      <header className="container center-align">
        <div>
          <img src="/icons/dbk/drabkirn-logo-192x192.png" alt="drabkirn logo" className="responsive-img" />
        </div>
        <div>
          <h1>Notga</h1>
        </div>
        <div>
          <p className="fs-1-2 bold">Take free, private, secure, unlimited, decentralized and end-to-end encrypted notes. What else do you need? <span role="img" aria-label="Thinking emoji">🤔️</span></p>
        </div>
      </header>

      <Footer />
    </React.Fragment>
  );
};

export default Home;