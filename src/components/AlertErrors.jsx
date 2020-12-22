export default function AlertErrors({ errors }) {
  if (!errors) return <></>;

  return (
    <div className="alert alert-danger text-left mt-3 mb-0 px-3" role="alert">
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <ul className="pl-3 mr-4 mb-0">
        {Object.keys(errors).map(name => errors[name].map(error => (
          <li>{ error }</li>
        )))}
      </ul>
    </div>
  );
}
