import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatch from '../nomatch/components/nomatch';

import User from '../users/components/users';
import EditUser from '../users/components/user_ins_upd';

const UserWrapper = () => {
  return (
    <Switch>
      <Route exact path='/users' component={User}></Route>
      <Route exact path='/users/:id/edit' component={EditUser}></Route>
      <Route exact path='/users/create' component={EditUser}></Route>
      <Route path='*' component={NoMatch}></Route>
    </Switch>
  );
};

export default UserWrapper;
