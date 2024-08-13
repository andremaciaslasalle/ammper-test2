// Home.jsx
import { Link } from 'react-router-dom';
import '../css/home.css';

const Home = () => {
  return (
    <div className="container">
      <h1>Bienvenido! </h1>
      <p>Este es el segundo caso de prueba elaborado por André J. Macías Rodríguez para <a href="https://ammper.com/" target='_blank'>Ammper</a></p>
      <nav>
        <ul>
          <li><Link to="/dashboard">Ver Dashboard</Link></li>
          <li><Link to="/email">Enviar Correo</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;