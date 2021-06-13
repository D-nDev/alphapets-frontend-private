import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';

import Register from '../pages/Register';
import Upload from '../pages/Upload';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
