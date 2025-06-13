import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdherenceChart: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Morning',
        data: [100, 100, 75, 100, 100, 50, 100],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Evening',
        data: [100, 75, 50, 25, 50, 100, 75],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default AdherenceChart;