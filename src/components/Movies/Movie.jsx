import moment from 'moment';
import 'moment/locale/es';
import { deleteMovie } from '../../api/movies';
import { Link, useDispatch, useSelector } from '../../router';
import Icon from '../Icon';
moment().locale('es');

export default function Movie({ movie, onRemove, ...rest }) {
  return (
    <div className="card movie" {...rest}>
      {Header(movie, onRemove)}
      {Body(movie)}
    </div>
  );
}

function Header({ id, title, created_by }, onRemove = null) {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const remove = () => {
    if (window.confirm('¿Está seguro de que quiere eliminar esta película?')) {
      console.log('remove');
      dispatch(deleteMovie(id)).then(() => {
        if (onRemove) onRemove();
      })
    }
  };
  return (
    <div className="card-header d-flex">
      <h5 className="card-title text-truncate mr-auto" title={title}>{ title }</h5>
      <div className="card-text ml-2 btn-group">
        {created_by === user.id && (
          <>
            <Link className="btn btn-outline-info btn-sm" to={`/movies/edit/${id}`}>
              {Icon({type:'edit'})}
            </Link>
            <button className="btn btn-outline-danger btn-sm" onClick={() => remove()}>
              {Icon({type:'remove'})}
            </button>
          </>
        ) }
      </div>
    </div>
  );
}

function Body(movie) {
  const { synopsis, year, created_at } = movie;
  return (
    <div className="card-body">
      <div className="card-text mb-3">
        <strong className="mr-1">Sinopsis:</strong>
        { synopsis }
      </div>
      <div className="d-flex">
        <div className="card-text mr-auto">
          <small><strong>Año:</strong> { year }</small>
        </div>
        <div className="card-text ml-2">
          <small className="text-muted text-nowrap">Creado hace { humanTime(created_at) }</small>
        </div>
      </div>
    </div>
  );
}

function humanTime(t) {
  const created = moment(t);
  const now = moment();
  return moment.duration(created.diff(now)).humanize();
}
