import React from 'react';
import { Link } from 'react-router-dom';

import { isUserSignedIn } from '../Shared/defaults';

function Home() {
  return(
    <div>
      <h3>This is home page</h3>
      {
        isUserSignedIn ? (
          <Link to="/dash">Dash</Link>
        ) : (
          <Link to="/login">Login</Link>
        )
      }
      <br /><br />
    </div>
  );
};

export default Home;