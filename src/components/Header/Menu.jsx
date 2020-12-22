// import { useDispatch, useSelector } from 'react-redux';
import { Link, useDispatch, useHistory, useSelector } from '../../router';
import { logout as Logout } from '../../store/reducers/user';

export default function Menu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.user);

  const logout = () => {
    dispatch(Logout());
    history.push('/');
  };

  if (user === false) return <></>;

  if (!user) {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Registrarse</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Ingresar</Link>
        </li>
      </ul>
    );
  }

  return (
    <>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/movies">Películas</Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            { user.nickname || 'Usuario' }
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <span className="dropdown-item" onClick={logout}>Salir</span>
          </div>
        </li>
      </ul>
    </>
  );
}
