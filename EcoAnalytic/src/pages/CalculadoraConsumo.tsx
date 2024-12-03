import React, { useState } from 'react';
import { colombiaEnergyData } from '../data/colombiaEnergyData';
import { calculateRenewablePercentage } from '../utils/energyCalculations';
import { EnergyBreakdown } from '../components/CalculadoraConsumo';
import { Zap } from 'lucide-react';
import '../styles/Calculadora.css';

const CalculadoraConsumo: React.FC = () => {
  const [consumption, setConsumption] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof calculateRenewablePercentage> | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const consumptionValue = parseFloat(consumption);
    
    if (consumptionValue > 0) {
      const calculationResult = calculateRenewablePercentage(consumptionValue, colombiaEnergyData);
      setResult(calculationResult);
    }
  };

  return (
         
<div className="calculator-container">
  <div className="calculator-content">
    <div className="calculator-header">
      <Zap />
      <h1 className="calculator-title">
        Calculadora de Energía Renovable
      </h1>
    </div>

    <form onSubmit={handleCalculate} className="calculator-form">
      <div className="form-group">
        <label htmlFor="consumption" className="form-label">
          Consumo Eléctrico Total (kWh)
        </label>
        <div className="input-wrapper">
          <input
            type="number"
            id="consumption"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            placeholder="Ingrese su consumo en kWh"
            required
            min="0"
            step="0.01"
            className="form-input"
          />
        </div>
      </div>

      <button type="submit" className="calculate-button">
        Calcular
      </button>
    </form>

    {result && (
      <div className="results-container">
        <div className="results-summary">
          <h2 className="results-title">
            Resultados
          </h2>
          <p className="result-item">
            Porcentaje de energía renovable: {result.percentage.toFixed(1)}%
          </p>
          
        </div>

          <h3 className="breakdown-title">
            Distribución de Fuentes Renovables Instaladas en Colombia para el 2021
          </h3>
          <p className="result-item">
            Total energía renovable: {result.totalRenewable.toFixed(2)} TWh
          </p>
          <EnergyBreakdown breakdown={result.breakdown}/>
      </div>
    )}
  </div>
</div>

    
  );
};

export default CalculadoraConsumo;