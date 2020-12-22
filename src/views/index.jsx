import { useSelector } from 'react-redux';
import { Switch, Route, PrivateRoute, PublicRoute } from '../router';

import Home from './Home';
import Login from './Login';
import Register from './Register';

export default function Views () {
  const auth = useSelector(store => !!store.user);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <PublicRoute check={auth} path="/register">
        <Register />
      </PublicRoute>
      <PublicRoute check={auth} path="/login">
        <Login />
      </PublicRoute>
      <PrivateRoute check={false} path="/:any" />
    </Switch>
  );
}
