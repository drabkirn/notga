import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import Dash from './Dash/Dash';
import New from './Notebook/New';
import Edit from './Notebook/Edit';
import Show from './Notebook/Show';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/dash" component={ Dash } />
      <Route exact path="/show/:id" component={ Show } />
      <Route exact path="/edit/:id" component={ Edit } />
      <Route exact path="/new" component={ New } />
      <Route path="/" component={ Home } />
    </Switch>
  );
}

export default App;
