/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import VideosIndex from "./containers/VideosIndex";
import Preferences from "./containers/Preferences";

export default () => (
  <App>
    <Switch>
      <Route path="/preferences" component={Preferences} />
      <Route path="/" component={VideosIndex} />
    </Switch>
  </App>
);
