import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return(
    <div>
      <h3>This is home page</h3>
      <Link to="/new">New Note</Link>
      <br /><br />
      <Link to="/show/1">Show Note</Link>
      <br /><br />
      <Link to="/dash">Dash</Link>
    </div>
  );
};

export default Home;