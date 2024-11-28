/*import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getRenewableShareData } from '../services/csvService';

interface PieChartProps {
  year: number;
  country: string;
}

const PieChart: React.FC<PieChartProps> = ({ year, country }) => {
  const [chartData, setChartData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRenewableShareData(year, country);
      setChartData({
        labels: data.labels,
        datasets: [
          {
            data: data.datasets[0].data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      });
    };
    fetchData();
  }, [year, country]);

  return chartData ? <Pie data={chartData} /> : <p>Cargando...</p>;
};

export default PieChart;
*/