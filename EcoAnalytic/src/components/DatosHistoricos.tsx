import React from 'react';
import { RenewableData } from '../utils/csvParser';
import '../styles/DatosHistoricos.css';

interface DataTableProps {
  data: RenewableData[];
  currentPage: number;
  itemsPerPage: number;
}

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }
  return value.toFixed(2);
};

export const DataTable: React.FC<DataTableProps> = ({ 
  data, 
  currentPage, 
  itemsPerPage 
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>País</th>
            <th>Código</th>
            <th>Año</th>
            <th>Eólica (TWh)</th>
            <th>Hídrica (TWh)</th>
            <th>Solar (TWh)</th>
            <th>Otras (TWh)</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td>{row.Entity || '-'}</td>
              <td>{row.Code || '-'}</td>
              <td>{row.Year || '-'}</td>
              <td>
                {formatNumber(row['Electricity from wind (TWh)'])}
              </td>
              <td>
                {formatNumber(row['Electricity from hydro (TWh)'])}
              </td>
              <td>
                {formatNumber(row['Electricity from solar (TWh)'])}
              </td>
              <td>
                {formatNumber(row['Other renewables including bioenergy (TWh)'])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};