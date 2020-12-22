import { Route, Switch, useRouteMatch } from '../../router';
import Create from './Create';
import Edit from './Edit';
import List from './List';

export default function Movies() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <List />
      </Route>
      <Route exact path={`${path}/insert`}>
        <Create />
      </Route>
      <Route path={`${path}/edit/:id`}>
        <Edit />
      </Route>
    </Switch>
  );
}
