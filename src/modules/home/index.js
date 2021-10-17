import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NoMatch from '../nomatch/components/nomatch';
import UPCOMING from './components/home';
import Launch_details from '../launches/components/launch_details';

const HomeWrapper = () => {
  return (
    <Switch>
      <Route exact path='/' component={UPCOMING}></Route>
      <Route
        exact
        path='/upcominglaunches/:id'
        component={Launch_details}
      ></Route>
      <Route path='*' component={NoMatch}></Route>
    </Switch>
  );
};

export default HomeWrapper;
