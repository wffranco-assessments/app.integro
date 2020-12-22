import Movie from './Movie';
// import Paginator from './Paginator';

export default function Movies({ movies = [], loading = false, error = null, onRemove = null }) {
  if (loading) return (
    <div className="d-flex align-items-center">
      <div className="spinner-border ml-auto mr-2" role="status" aria-hidden="true"></div>
      <strong className="mr-auto">Loading...</strong>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      Ocurrió un error consultando la api.
      {}
    </div>
  );

  if (!movies) return <></>;

  if (!movies.length) return (
    <div className="alert alert-danger" role="alert">
      No hay resultados para mostrar.
    </div>
  );

  return (
    <>
      <div className="card-deck movie-list">
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} onRemove={onRemove} />
        ))}
      </div>
      {/* <Paginator /> */}
    </>
  );
}
