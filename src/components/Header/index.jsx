import { Link } from 'react-router-dom';
import './index.scss';

import Icon from '../Icon';
import Menu from './Menu';

export default function Header() {
  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          {Icon({type:'react'})}
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
          </ul>
          {Menu()}
        </div>
      </nav>
    </header>
  );
}
