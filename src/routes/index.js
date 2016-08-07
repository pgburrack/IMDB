import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { setInitialState } from 'utils';

export default (store) => {
  return (
    <Route>
      <Route name="layout" store={store} path='/' component={require('react-router-proxy?name=layout!layouts/CoreLayout/CoreLayout')} onEnter={setInitialState}>
        <IndexRoute store={store} component={require('react-router-proxy?name=movies!views/MoviesView')} />

      </Route>
      <Route path='*' component={require('react-router-proxy?name=all!./../views/ForbiddenView')} status={404} />
    </Route>
  );
};
