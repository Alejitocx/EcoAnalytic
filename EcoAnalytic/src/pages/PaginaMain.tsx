import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PaginaMain.css'; 
import '../images/IMG2.jpg'

const PaginaMain: React.FC = () => {
  return (
    <div className="pagina-main-container">
      <div className="image-container">
        <img src="src\images\IMG2.jpg" alt="Energía Eólica" className="center-image" />
      </div>
      <Link to="/energia">
        <button className="btn-energia">Energía Eólica</button>
      </Link>
    </div>
  );
};

export default PaginaMain;
