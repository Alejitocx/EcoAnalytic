import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/PaginaMain.css'; 
import '../images/IMG2.jpg'

const PaginaMain: React.FC = () => {
  useEffect(() => {
    // Desactiva el scroll cuando se carga la página
    document.body.style.overflow = "hidden";

    // Limpia el estilo cuando salgas de la página
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="pagina-main-container">
       <Link to="/energia">
      <div className="image-container">
        <img src="src\images\IMG2.jpg" alt="Energía Eólica" className="center-image" />
      </div>
      </Link>
      <Link to="/energia">
        <button className="btn-energia">Energía Eólica</button>
      </Link>
    </div>
  );
};

export default PaginaMain;
