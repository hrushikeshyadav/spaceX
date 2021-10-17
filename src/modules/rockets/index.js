import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatch from '../nomatch/components/nomatch';
import Rockets from './components/rockets';
import Rocket_details from './components/rocket_details';

const RocketsWrapper = () => {
  return (
    <Switch>
      <Route exact path='/rockets' component={Rockets}></Route>
      <Route exact path='/rockets/:id' component={Rocket_details}></Route>
      <Route path='*' component={NoMatch}></Route>
    </Switch>
  );
};

export default RocketsWrapper;
