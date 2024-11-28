/*import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getEnergyConsumptionComparison } from '../services/csvService';

// Registrar componentes necesarios de Chart.js
Chart.register(...registerables);

interface AreaChartProps {
  year: number;
  country: string;
}

const AreaChart: React.FC<AreaChartProps> = ({ year, country }) => {
  const [chartData, setChartData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getEnergyConsumptionComparison(year, country);

        if (data && data.labels && data.datasets.length > 0) {
          setChartData({
            labels: data.labels,
            datasets: [
              {
                label: 'Renovable vs Convencional',
                data: data.datasets[0].data,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4, // Suaviza la curva de la línea
              },
            ],
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
                  text: 'Meses / Categorías',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Consumo de Energía (GWh)',
                },
                beginAtZero: true,
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

export default AreaChart;
*/