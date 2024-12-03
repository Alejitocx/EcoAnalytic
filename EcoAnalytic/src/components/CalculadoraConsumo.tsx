import React from 'react';
import { Wind, Sun, Droplets, Leaf } from 'lucide-react';
import '../styles/Calculadora.css'

interface EnergyBreakdownProps {
  breakdown: {
    solar: number;
    wind: number;
    hydro: number;
    other: number;
  };
}

export const EnergyBreakdown: React.FC<EnergyBreakdownProps> = ({ breakdown }) => {
  return (
    
    <div className="energy-breakdown">

    <div className="source"> 
      <div className="source-icon">
          <Wind />
          <span>Eólica</span>
        </div>
        <p className="source-percentage">{breakdown.wind.toFixed(1)}%</p>
    </div>
  
    <div className="source">
      <div className="source-icon">
        <Sun />
        <span>Solar</span>
      </div>
      <p className="source-percentage">{breakdown.solar.toFixed(1)}%</p>
    </div>
  
    <div className="source">
      <div className="source-icon">
        <Droplets />
        <span>Hídrica</span>
      </div>
      <p className="source-percentage">{breakdown.hydro.toFixed(1)}%</p>
    </div>
  
    <div className="source">
      <div className="source-icon">
        <Leaf />
        <span>Otras</span>
      </div>
      <p className="source-percentage">{breakdown.other.toFixed(1)}%</p>
    </div>
  </div>
  );
};