import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getInstalledCapacityTrend } from '../utils/csvService';

// Registrar componentes necesarios de Chart.js
Chart.register(...registerables);

interface LineChartProps {
  year: number;
  country: string;
}

const LineChart: React.FC<LineChartProps> = ({ year, country }) => {
  const [chartData, setChartData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getInstalledCapacityTrend(year, country);
        
        if (data && data.labels && data.datasets.length > 0) {
          setChartData({
            labels: data.labels,
            datasets: data.datasets.map((dataset: any) => ({
              label: dataset.label,
              data: dataset.data,
              fill: false,
              borderColor: '#FF6384',
              pointBackgroundColor: '#FF6384',
              tension: 0.4, // Suaviza la línea
            })),
          });
        } else {
          setError('No hay datos disponibles para el año y país seleccionados.');
        }
      } catch (err) {
        setError('Error al cargar los datos. Por favor, inténtalo de nuevo.');
        console.error('Error fetching chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, country]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ position: 'relative', height: '400px' }}>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Años',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Capacidad Instalada (MW)',
                },
                beginAtZero: true,
              },
            },
            elements: {
              point: {
                radius: 5,
              },
            },
          }}
        />
      ) : (
        <p>Datos no disponibles.</p>
      )}
    </div>
  );
};

export default LineChart;
