import React from 'react';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Notes from './containers/Notes';
import NewNote from './containers/NewNote';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Signup from './containers/Signup';
import Settings from './containers/Settings';

import Login from './containers/Login';

export default function Routes() {
  return (
    <Switch>
      <UnauthenticatedRoute exact path='/login'>
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path='/signup'>
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path='/settings'>
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path='/notes/new'>
        <NewNote />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path='/notes/:id'>
        <Notes />
      </AuthenticatedRoute>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
