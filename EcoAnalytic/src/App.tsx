import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import DatosHistoricos from './components/DatosHistoricos';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      {/* El Navbar se coloca fuera de las rutas */}
      <Navbar />
      <div className="container">
        {/* Rutas para navegar entre las páginas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/datos-historicos" element={<DatosHistoricos />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
