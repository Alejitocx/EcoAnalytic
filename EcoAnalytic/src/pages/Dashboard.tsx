
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {
  EnergyData,
  getUniqueRegions,
  getUniqueYears,
  filterData,
  filterDataLi,
  getProductionDataForBarChart,
  getRenewablesShareForPieChart,
  getInstalledCapacityForLineChart,
  getEnergyConsumptionComparisonForAreaChart, // Importa la función para el gráfico de área
} from '../utils/CalculationService';
import { getCsvDataForChart } from '../utils/csvService';
import '../styles/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [barChartData, setBarChartData] = useState<number[]>([]);
  const [pieChartData, setPieChartData] = useState<number[]>([]);
  const [lineChartData, setLineChartData] = useState<{ labels: string[]; wind: number[]; solar: number[]; geothermal: number[] }>({ labels: [], wind: [], solar: [], geothermal: [] });
  const [areaChartData, setAreaChartData] = useState<{ labels: string[]; renewable: number[]; conventional: number[] }>({ labels: [], renewable: [], conventional: [] });  const [regions, setRegions] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getCsvDataForChart('barChart');
        const uniqueRegions = getUniqueRegions(data as EnergyData[]);
        const uniqueYears = getUniqueYears(data as EnergyData[]);
        setRegions(uniqueRegions);
        setYears(uniqueYears);
        setSelectedYear(uniqueYears[0] || null);
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
          const data = await getCsvDataForChart('pieChart');
          const filteredData = filterData(data as EnergyData[], selectedRegion, selectedYear);
          const pieData = getRenewablesShareForPieChart(filteredData);
          setPieChartData(pieData);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };

    updatePieChartData();
  }, [selectedRegion, selectedYear]);

  useEffect(() => {
    const updateLineChartData = async () => {
      if (selectedRegion) {
        try {
          const data = await getCsvDataForChart('lineChart');
          const filteredData = filterDataLi(data as EnergyData[], selectedRegion);
          const lineData = getInstalledCapacityForLineChart(filteredData);
          setLineChartData(lineData);
        } catch (err: any) {
          setError((err as Error).message);
          console.error("Error updating line chart data:", err);
        }
      }
    };

    updateLineChartData();
  }, [selectedRegion]);

  useEffect(() => {
    const updateAreaChartData = async () => {
      if (selectedRegion) {
        try {
          const data = await getCsvDataForChart('areaChart');
          const filteredData = filterDataLi(data as EnergyData[], selectedRegion);
          const areaData = getEnergyConsumptionComparisonForAreaChart(filteredData);
          setAreaChartData(areaData);
        } catch (err: any) {
          setError((err as Error).message);
          console.error("Error updating area chart data:", err);
        }
      }
    };

    updateAreaChartData();
  }, [selectedRegion]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard de Energías Renovables</h2>
      <div className="selectors-container">
        <div className="selectors"> {/* Contenedor para centrar los selectores */}
          <label htmlFor="region">Región:</label>
          <select
            id="region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Selecciona una región</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <label htmlFor="year">Año:</label>
          <select
            id="year"
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10) || null)}
          >
            <option value="">Selecciona un año</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="charts-section">
        <h3>Gráficas con filtro por región y año</h3>
        <div className="chart-group">
          <div className="card">
            <div className="card-body">
            <div className="chart-bar"> 
              <Bar
                data={{
                  labels: ['Viento', 'Solar', 'Hidro', 'Biocombustibles', 'Geotérmica'],
                  datasets: [
                    {
                      label: `Producción de Energía (${selectedRegion}, ${selectedYear})`,
                      data: barChartData,
                      backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6384'],
                    },
                  ],
                }}
              />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
            <div className="chart-pie">
              <Pie
                data={{
                  labels: ['Viento', 'Solar', 'Hidroeléctrica'],
                  datasets: [
                    {
                      data: pieChartData,
                      backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
                    },
                  ],
                }}
              />
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <h3>Gráficas de recuento histórico</h3>
        <div className="chart-group">
          <div className="card">
            <div className="card-body">
              <Line
                data={{
                  labels: lineChartData.labels,
                  datasets: [
                    {
                      label: 'Capacidad Eólica',
                      data: lineChartData.wind,
                      borderColor: '#36A2EB',
                      fill: false,
                    },
                    {
                      label: 'Capacidad Solar',
                      data: lineChartData.solar,
                      borderColor: '#FFCE56',
                      fill: false,
                    },
                    {
                      label: 'Capacidad Geotérmica',
                      data: lineChartData.geothermal,
                      borderColor: '#FF6384',
                      fill: false,
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Line
                data={{
                  labels: areaChartData.labels,
                  datasets: [
                    {
                      label: 'Consumo Energía Renovable',
                      data: areaChartData.renewable,
                      backgroundColor: '#36A2EB',
                      fill: true,
                    },
                    {
                      label: 'Consumo Energía Convencional',
                      data: areaChartData.conventional,
                      backgroundColor: '#FF6384',
                      fill: true,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Dashboard;

