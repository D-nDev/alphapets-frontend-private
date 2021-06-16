import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';

import Register from '../pages/Register';
import Painel from '../pages/Painel';
import SMS from '../pages/SMS';
import Email from '../pages/Email';
import Recover from '../pages/RecoverPass';
import PetList from '../pages/PetList';
import Schedules from '../pages/Schedules';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/painel" component={Painel} />
        <Route path="/sms" component={SMS} />
        <Route path="/email" component={Email} />
        <Route path="/recover" component={Recover} />
        <Route path="/petlist" component={PetList} />
        <Route path="/schedules" component={Schedules} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
