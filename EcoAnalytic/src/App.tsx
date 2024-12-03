import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import DatosHistoricos from './pages/DatosHistoricos';
import Dashboard from './pages/Dashboard';
import PaginaMain from './pages/PaginaMain';
import EnergiaE from './pages/Energia';
import CalculadoraC from './pages/CalculadoraConsumo';
import PiePagina from './components/PiePagina';

const App: React.FC = () => {
  return (
    <Router>
      {/* El Navbar se coloca fuera de las rutas */}
      <Navbar />
      <div className="container">
        {/* Rutas para navegar entre las páginas */}
        <Routes>
        <Route path="/" element={<PaginaMain/> }/>
          <Route path="/energia" element={<EnergiaE />} />
          <Route path="/datos-historicos" element={<DatosHistoricos />} />
          <Route path="/calculadora" element={<CalculadoraC />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <PiePagina/>
    </Router>
  );
};

export default App;
