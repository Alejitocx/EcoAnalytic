import React from 'react';
import { RenewableData } from '../utils/csvParser';
import '../styles/DatosHistoricos.css';

interface FiltersProps {
  data: RenewableData[];
  selectedEntity: string;
  selectedYear: string;
  onEntityChange: (entity: string) => void;
  onYearChange: (year: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  data,
  selectedEntity,
  selectedYear,
  onEntityChange,
  onYearChange,
}) => {
  const entities = Array.from(new Set(data.map(item => item.Entity))).sort();
  const years = Array.from(new Set(data.map(item => item.Year))).sort();

  return (
    <div className="filter-area">
      <div>
        <label htmlFor="entity">
          País
        </label>
        <select
          id="entity"
          value={selectedEntity}
          onChange={(e) => onEntityChange(e.target.value)}
        >
          <option value="">Todos los Países</option>
          {entities.map(entity => (
            <option key={entity} value={entity}>{entity}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="year">
          Año
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
        >
          <option value="">Todos los Años</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};