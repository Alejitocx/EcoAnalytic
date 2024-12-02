import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getRenewableProductionData } from '../utils/csvService';
import { ChartData } from 'chart.js';

interface BarChartProps {
  year: number;
  country: string;
}

const BarChart: React.FC<BarChartProps> = ({ year, country }) => {
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getRenewableProductionData(year, country);
      setChartData(data);
      setLoading(false);
    };
    fetchData();
  }, [year, country]);

  if (loading) return <p>Cargando...</p>;
  if (!chartData) return <p>No hay datos disponibles.</p>;

  return <Bar data={chartData} />;
};

export default BarChart;
