import { useState } from 'react';

import { Link, useDispatch } from '../router';
import { login } from '../store/reducers/user';

import AlertErrors from '../components/AlertErrors';
import Icon from '../components/Icon';

export default function Login() {
  const dispatch = useDispatch();
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
    dispatch(login({email, password})).catch(error => {
      console.error('error:', error);
      setErrors({error: ['Usuario y/o contraseña inválido(s).']});
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
            <h3>Ingresar</h3>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Icon type="user" />
                  </span>
                </div>
                <input type="email" className="form-control" placeholder="Correo" autoComplete="off" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Icon type="key" />
                  </span>
                </div>
                <input type="password" className="form-control" placeholder="Contraseña" autoComplete="off" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="text-left">
                <input type="checkbox" className="mr-1" /> Remember Me
              </div> */}
              <div>
                <input type="submit" value="Ingresar" className="btn btn-primary btn-block" />
              </div>
            </form>
            <AlertErrors errors={errors} />
          </div>
          <div className="card-footer text-center">
            ¿No tiene una cuenta?
            <Link className="ml-1" to="/register">Registrese</Link>
            {/* <div className="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex-fill"></div>
    </main>
  );
}
