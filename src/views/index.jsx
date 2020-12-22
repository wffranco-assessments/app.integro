import { Switch, Route, PrivateRoute } from '../router';

import Home from './Home';

export default function Views () {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <PrivateRoute check={false} path="/:any">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}
