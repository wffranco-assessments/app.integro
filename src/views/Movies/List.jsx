import { useEffect, useState } from 'react';
import { Link, useDispatch } from '../../router';
import { getMovies } from '../../api/movies';
import Movies from '../../components/Movies';
import Icon from '../../components/Icon';

export default function List() {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateMovies = () => {
    setLoading(true);
    setError(null);
    getMovies(dispatch)
      .then(movies => setMovies(movies))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateMovies(), []);

  return (
    <div className="container-fluid my-3">
      <div className="card">
        <h5 className="card-header d-flex">
          <div className="card-title mr-auto">Películas</div>
          <div className="btn-group-gutter">
            {!loading && (
              <button onClick={updateMovies} title="Recargar" className="btn btn-outline-secondary btn-sm">
                {Icon({type:'repeat'})}
              </button>
            )}
            <Link className="btn btn-outline-success btn-sm" to="/movies/insert">
              {Icon({type:'plus', className:'mr-1'})}
              Agregar
            </Link>
          </div>
        </h5>
        <div className="card-body">
          <Movies movies={movies} loading={loading} error={error} onRemove={updateMovies} />
        </div>
      </div>
    </div>
  );
}
