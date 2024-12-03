import '../styles/PiePagina.css'; 

const piePagina: React.FC = () => {

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} EcoAnalityc. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#about">Acerca de</a>
          <a href="#contact">Contacto</a>
          <a href="#privacy">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default piePagina;
