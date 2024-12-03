import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler,ArcElement } from "chart.js";

import {
  EnergyData,
  getUniqueRegions,
  getUniqueYears,
  filterData,
  getProductionDataForBarChart,
  getRenewablesShareForPieChart,
  getInstalledCapacityForLineChart,
  getEnergyConsumptionComparisonForAreaChart,
} from '../utils/CalculationService';
import { getCsvDataForChart } from '../utils/csvService';
import '../styles/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [barChartData, setBarChartData] = useState<number[]>([]);
  const [pieChartData, setPieChartData] = useState<number[]>([]);
  const [lineChartData, setLineChartData] = useState<{ labels: number[]; wind: number[]; solar: number[]; geothermal: number[] }>({ labels: [], wind: [], solar: [], geothermal: [] });
  const [areaChartData, setAreaChartData] = useState<{ labels: number[]; renewable: number[]; conventional: number[] }>({ labels: [], renewable: [], conventional: [] });
  const [regions, setRegions] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCsvDataForChart('barChart');
        setRegions(getUniqueRegions(data as EnergyData[]));
        setYears(getUniqueYears(data as EnergyData[]));
        setSelectedRegion(getUniqueRegions(data as EnergyData[])[0] || '');
        setSelectedYear(getUniqueYears(data as EnergyData[])[0] || null);
      } catch (err: any) {
        setError('Error al cargar los datos. Por favor, inténtalo nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateCharts = async () => {
      try {
        if (selectedRegion && selectedYear) {
          const data = await getCsvDataForChart('barChart');
          const filteredData = filterData(data as EnergyData[], selectedRegion, selectedYear);
          setBarChartData(getProductionDataForBarChart(filteredData));
          setPieChartData(getRenewablesShareForPieChart(filteredData));
        }
        const lineData = await getCsvDataForChart('lineChart');
        setLineChartData(getInstalledCapacityForLineChart(lineData as EnergyData[]));
        const areaData = await getCsvDataForChart('areaChart');
        setAreaChartData(getEnergyConsumptionComparisonForAreaChart(areaData as EnergyData[]));
      } catch (err: any) {
        setError('Error al actualizar los gráficos.');
      }
    };

    updateCharts();
  }, [selectedRegion, selectedYear]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard de Energías Renovables</h2>

      <div className="selectors-container">
        <div className="selectors">
          <label htmlFor="region">Región:</label>
          <select
            id="region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
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
            onChange={(e) => setSelectedYear(Number(e.target.value) || null)}
          >
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
          <div className="chart-card">
            <Bar
              data={{
                labels: ['Eolica', 'Solar', 'Hidro', 'Biocombustibles', 'Geotérmica'],
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
          <div className="chart-card">
            <Pie
              data={{
                labels: ['Eolica', 'Solar', 'Hidroeléctrica'],
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

      <div className="charts-section">
        <h3>Gráficas de recuento histórico</h3>
        <div className="chart-group">
          <div className="chart-card">
            <Line
              data={{
                labels: lineChartData.labels,
                datasets: [
                  { label: 'Capacidad Eólica', data: lineChartData.wind, borderColor: '#36A2EB', fill: false },
                  { label: 'Capacidad Solar', data: lineChartData.solar, borderColor: '#FFCE56', fill: false },
                  { label: 'Capacidad Geotérmica', data: lineChartData.geothermal, borderColor: '#FF6384', fill: false },
                ],
              }}
            />
          </div>
          <div className="chart-card">
            <Line
              data={{
                labels: areaChartData.labels,
                datasets: [
                  {
                    label: "Consumo Energía Renovable",
                    data: areaChartData.renewable,
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "#36A2EB",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                  },
                  {
                    label: "Consumo Energía Convencional",
                    data: areaChartData.conventional,
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderColor: "#FF6384",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Años",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Consumo de Energía",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
