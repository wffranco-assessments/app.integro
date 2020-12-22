import getPages from '../../utils/pages';
import { useHistory } from '../../router';
import { useActions } from '../../redux/store';

export default function Paginator() {
  const { pagination } = useActions(['pagination']);
  const { query, current, previous, next, pages } = pagination();

  return (
    <div className="card-deck">
      <nav className="m-2" aria-label="Page navigation example">
        <ul className="pagination mb-0">
          <Button page={previous} disabled={!previous}><span aria-hidden="true">&laquo;</span></Button>

          <PageButtons query={query} current={current} pages={pages} />

          <Button page={next} disabled={!next}><span aria-hidden="true">&raquo;</span></Button>
        </ul>
      </nav>
    </div>
  );

  function PageButtons() {
    return getPages({current, pages}).map(n => (
      <Button page={n} query={query} />
    ));
  }

  function Button({page = 1, disabled:dis = false, children = null}) {
    const history = useHistory();
    const disabled = dis || page === '...' || page === current;

    const goToPage = () => disabled ? null : history.push(`/search/${query.q}/${page}`);

    return (
      <li className={`page-item ${disabled&&'disabled'}`}>
        <button onClick={goToPage} className="page-link" disabled={disabled}>{children||page}</button>
      </li>
    );
  }

}
