import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  EnergyData,
  getUniqueRegions,
  getUniqueYears,
  filterData,
  getProductionDataForBarChart,
  getRenewablesShareForPieChart,
} from '../utils/CalculationService'; // Ajusta la ruta según tu estructura
import { getCsvDataForChart } from '../utils/csvService';
import '../styles/Dashboard.css';

// Registrar escalas y elementos en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYear, setSelectedYear] = useState(0);
  const [barChartData, setBarChartData] = useState<number[]>([]);
  const [pieChartData, setPieChartData] = useState<number[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCsvDataForChart('barChart'); // Ajusta la ruta del archivo CSV
        const uniqueRegions = getUniqueRegions(data as EnergyData[]);
        const uniqueYears = getUniqueYears(data as EnergyData[]);
        setRegions(uniqueRegions);
        setYears(uniqueYears);
        setSelectedYear(uniqueYears[0] || 0);
        setSelectedRegion(uniqueRegions[0] || '');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Actualizar datos del gráfico de barras
  useEffect(() => {
    const updateBarChartData = async () => {
      if (selectedRegion && selectedYear) {
        try {
          const data = await getCsvDataForChart('barChart');
          const filteredData = filterData(data as EnergyData[], selectedRegion, selectedYear);
          const productionData = getProductionDataForBarChart(filteredData);
          setBarChartData(productionData);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };
    updateBarChartData();
  }, [selectedRegion, selectedYear]);

  // Actualizar datos del gráfico de pastel
  useEffect(() => {
    const updatePieChartData = async () => {
      if (selectedRegion && selectedYear) {
        try {
          const data = await getCsvDataForChart('pieChart'); // Ajusta la ruta del archivo CSV
          const filteredData = filterData(data as EnergyData[], selectedRegion, selectedYear);
          const renewablesShareData = getRenewablesShareForPieChart(filteredData);
          setPieChartData(renewablesShareData);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };
    updatePieChartData();
  }, [selectedRegion, selectedYear]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard de Energías Renovables</h2>

      <div className="controls">
        <label htmlFor="region">Región:</label>
        <select id="region" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
          <option value="">Selecciona una región</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <label htmlFor="year">Año:</label>
        <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}>
          <option value="">Selecciona un año</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="chart-container">
        <div className="chart">
          {barChartData.length > 0 ? (
            <Bar
              data={{
                labels: ['Viento', 'Solar', 'Hidro', 'Biocombustibles', 'Geotérmica'],
                datasets: [
                  {
                    label: `Producción de Energía en ${selectedRegion} (${selectedYear})`,
                    data: barChartData,
                    backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          ) : (
            <p>No hay datos para mostrar.</p>
          )}
        </div>

        <div className="chart">
          {pieChartData.length > 0 ? (
            <Pie
              data={{
                labels: ['Energía Eólica', 'Energía Solar', 'Energía Hidroeléctrica'],
                datasets: [
                  {
                    data: pieChartData,
                    backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          ) : (
            <p>No hay datos para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
