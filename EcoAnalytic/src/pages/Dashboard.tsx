import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  EnergyData,
  getUniqueRegions,
  getUniqueYears,
  filterData,
  getProductionDataForBarChart
} from '../utils/CalculationService'; // Ajusta la ruta según tu estructura
import { getCsvDataForChart } from '../utils/csvService';
import '../styles/Dashboard.css'

// Registrar escalas y elementos en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYear, setSelectedYear] = useState(0);
  const [chartData, setChartData] = useState<number[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getCsvDataForChart('barChart'); // Asegúrate de que 'barChart' sea correcto
        const uniqueRegions = getUniqueRegions(data as EnergyData[]);
        const uniqueYears = getUniqueYears(data as EnergyData[]);
        setRegions(uniqueRegions);
        setYears(uniqueYears);
        setSelectedYear(uniqueYears[0] || 0); // Establece un valor por defecto
        setSelectedRegion(uniqueRegions[0] || ''); // Establece un valor por defecto
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Actualizar datos del gráfico cuando cambian región o año
  useEffect(() => {
    const updateChartData = async () => {
      if (selectedRegion && selectedYear) {
        try {
          const data = await getCsvDataForChart('barChart');
          const filteredData = filterData(data as EnergyData[], selectedRegion, selectedYear);
          const productionData = getProductionDataForBarChart(filteredData);
          setChartData(productionData);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };

    updateChartData();
  }, [selectedRegion, selectedYear]);

  // Renderizar contenido
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Gráfico de Barras - Energías Renovables</h2>

      <div>
        <label htmlFor="region">Región:</label>
        <select
          id="region"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Selecciona un país</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="year">Año:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
        >
          <option value="">Selecciona un año</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {chartData.length > 0 ? (
        <Bar
          data={{
            labels: ['Viento', 'Solar', 'Hidro', 'Biocombustibles', 'Geotérmica'],
            datasets: [
              {
                label: `Producción de Energía en ${selectedRegion} (${selectedYear})`,
                data: chartData,
                backgroundColor: [
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default Dashboard;
