import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatch from '../nomatch/components/nomatch';
import Launches from './components/launches';
import Launch_details from './components/launch_details';

const LaunchesWrapper = () => {
  return (
    <Switch>
      <Route exact path='/launches' component={Launches}></Route>
      <Route exact path='/launches/:id' component={Launch_details}></Route>
      <Route path='*' component={NoMatch}></Route>
    </Switch>
  );
};

export default LaunchesWrapper;
