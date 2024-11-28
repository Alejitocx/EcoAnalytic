import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getRenewableProductionData } from '../services/csvService';
import { ChartData } from 'chart.js';

// Tipado para las props
interface BarChartProps {
  year: number;
  country: string;
}

const BarChart: React.FC<BarChartProps> = ({ year, country }) => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRenewableProductionData(year, country);
        setChartData(data); // Ahora los tipos coinciden correctamente
      } catch (err) {
        setError("Error al cargar los datos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year, country]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!chartData) return <p>No hay datos disponibles.</p>;

  return <Bar data={chartData} />;
};

export default BarChart;
