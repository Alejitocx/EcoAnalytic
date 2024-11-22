import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../images/logo.png';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo EcoAnalytic" className="logo-img" />
        </Link>
      </div>

      <div className="navbar-links-container">
        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}> {/* <-- AQUÍ ESTA EL CAMBIO */}
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/datos-historicos" className="navbar-link">Datos Históricos</Link>
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </div>
      </div>

      <button className="navbar-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;