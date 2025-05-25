import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function OrdersChart() {
  const [chartData, setChartData] = useState(null); // default is null for safety
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/orders/stats')
      .then(response => {
        const data = response.data;
  
        if (data && data.monthlyOrders) {
          const labels = Object.keys(data.monthlyOrders);
          const counts = Object.values(data.monthlyOrders);
  
          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Orders',
                data: counts,
                borderColor: 'blue',
                fill: false,
              }
            ]
          });
        }
        setLoading(false);  // Move here to stop loading after data is set
      })
      .catch(err => {
        console.error('📉 Error fetching order stats:', err);
        setLoading(false); // Stop loading even if error
      });
  }, []);
  

  if (loading || !chartData || !chartData.labels) {
    return <p>📊 Loading chart data...</p>;
  }

  return (
    <div>
      <h2>Orders Over Time</h2>
      <Line data={chartData} />
    </div>
  );
}

export default OrdersChart;