import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useDispatch, useHistory } from '../../router';
import { insertMovie } from '../../api/movies';
// import Icon from '../../components/Icon';
import AlertErrors from '../../components/AlertErrors';

export default function Create() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const submit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    try {
      await dispatch(insertMovie({title, synopsis, year}));
      console.log('success');
      history.push('/movies');
    } catch(error) {
      setErrors(error.body.errors);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getYears(); }, []);

  return (
    <main className="flex-fill d-flex flex-column">
      <div className="flex-fill"></div>
      <div className="container">
        <div className="card card-md card-row">
          <div className="card-header text-center">
            <h3>Agregar Película</h3>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <input name="title" type="text" className="form-control mb-3" placeholder="Título" required
                value={title} onChange={e => setTitle(e.target.value)}
              />
              <textarea name="synopsis" className="form-control mb-3"
                value={synopsis} onChange={e => setSynopsis(e.target.value)}
              />
              <select name="year" className="form-control mb-3" placeholder="Año" required
                value={year} onChange={e => setYear(e.target.value)}
              >
                <option value="">Año</option>
                {getYears().map(year => (
                  <option key={year} value={year}>{ year }</option>
                ))}
              </select>
              <input type="submit" value="Guardar" className="btn btn-primary btn-block" disabled={loading} />
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

function getYears() {
  const min = 1888;
  const max = moment().year() + 1;
  const years = [];
  for (let i = max; i >= min; i--) years.push(String(i));
  return years;
}
