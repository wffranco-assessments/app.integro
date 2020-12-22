import logo from '../logo.svg';
import './Home.scss';

export default function Home() {
  return (
    <main className="Home flex-fill d-flex flex-column">
      <div className="flex-fill"></div>
      <div className="text-center">
        <h1>Demo Integro</h1>
        <img src={logo} className="Home-logo" alt="logo" />
        <h3>laravel 8 + react.js + redux + bootstrap</h3>
        <h6>
          <span className="mr-2">Código fuente:</span>
          <a href="https://github.com/wffranco/api.integro">Front end</a>
          <span className="mx-2">|</span>
          <a href="https://github.com/wffranco/app.integro">Back end</a>
        </h6>
      </div>
      <div className="flex-fill"></div>
    </main>
  );
}
