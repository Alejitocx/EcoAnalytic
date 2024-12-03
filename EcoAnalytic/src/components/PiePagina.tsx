import React from 'react';
import '../styles/PiePagina.css'; // Asegúrate de crear este archivo para los estilos

const Pie: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Sobre Nosotros</h4>
          <p>
            Somos un equipo comprometido con la promoción de energías renovables y
            el desarrollo sostenible.
          </p>
        </div>
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EcoAnalytic. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Pie;