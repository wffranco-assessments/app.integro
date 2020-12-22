import { useState } from 'react';

import { Link, useDispatch } from '../router';
import { register } from '../store/reducers/user';

import AlertErrors from '../components/AlertErrors';
import Icon from '../components/Icon';

export default function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  function submit(e) {
    if (e) e.preventDefault();
    console.log('submit');
    if (loading) return;

    setLoading(true);
    setErrors(null);
    dispatch(register({name, nickname, email, password})).catch(error => {
      console.error('error:', error);
      setErrors(error.body.errors);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <main className="flex-fill d-flex flex-column">
      <div className="flex-fill"></div>
      <div className="container">
        <div className="card card-sm card-row">
          <div className="card-header text-center">
            <h3>Registrarse</h3>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Icon type="username" />
                  </span>
                </div>
                <input name="name" type="text" className="form-control" placeholder="Nombre" required
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Icon type="user" />
                  </span>
                </div>
                <input name="nickname" type="text" className="form-control" placeholder="Apodo" required
                  value={nickname} onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Icon type="email" />
                  </span>
                </div>
                <input name="email" type="email" className="form-control" placeholder="Correo" autoComplete="off" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Icon type="key" />
                  </span>
                </div>
                <input name="password" type="password" className="form-control" placeholder="Contraseña" autoComplete="off" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input type="submit" value="Registrarse" className="btn btn-primary btn-block" disabled={loading} />
              </div>
            </form>
            <AlertErrors errors={errors} />
          </div>
          <div className="card-footer text-center">
            ¿Ya tiene una cuenta?
            <Link className="ml-1" to="/login">Ingrese</Link>
          </div>
        </div>
      </div>
      <div className="flex-fill"></div>
    </main>
  );
}

