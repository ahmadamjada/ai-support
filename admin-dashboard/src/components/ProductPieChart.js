import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

function ProductPieChart() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get('/api/orders/product-distribution') // API endpoint you'll create
      .then(response => {
        const data = response.data;
        setChartData({
          labels: data.products,
          datasets: [
            {
              data: data.counts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }
          ]
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Product Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default ProductPieChart;
