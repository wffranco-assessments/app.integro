import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router } from './router';
import { getAuthUser } from './store/reducers/user';

import Header from './components/Header';
import Views from './views';

import './App.scss';

export default function App() {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getAuthUser), []);

  return (
    <Router>
      <div className="App d-flex flex-column">
        <Header />
        <Views />
      </div>
    </Router>
  );
}
