import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import countries from '../data/countries';

const Dashboard: React.FC = () => {
  const [year, setYear] = useState<number>(2020);
  const [country, setCountry] = useState<string>('Africa');
  const [countriesData, setCountriesData] = useState<any[]>([]);

  useEffect(() => {
    setCountriesData(countries);
  }, []);

  return (
    <div>
      <h1>Dashboard de Energía Renovable</h1>

      <label htmlFor="countrySelect">País:</label>
      <select
        id="countrySelect"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        {countriesData.map((countryOption: any) => (
          <option key={countryOption.value} value={countryOption.value}>
            {countryOption.label}
          </option>
        ))}
      </select>

      <label htmlFor="yearSelect">Año:</label>
      <select
        id="yearSelect"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value, 10))}
      >
        <option value=""> </option> {/* Opción vacía */}
        {Array.from({ length: 2021 - 1965 + 1 }, (_, i) => 1965 + i).map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>

      <BarChart year={year} country={country} />
    </div>
  );
};

export default Dashboard;