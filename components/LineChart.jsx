import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';


export default function LineChart({ stock }) {
  

	const data = {
		labels: stock.values.map(data => data.datetime.split(' ')[1]),
		datasets: [
			{
				label: 'test',
				data: stock.values.map(data => data.close),
				backgroundColor: '#2469f0',
				borderColor: '#2469f0',
        pointRadius: 1,
        pointHoverRadius: 8,
				tension: 0.5,
			}
		]
	};

  const options = {
		plugins: {
      legend: false, // Hide legend
		},
		scales: {
			y: {
				display: false // Hide Y axis labels
			},
      x: {
        display: false // Hide X axis labels
      }
		}
	};

  return (<Line data={data} options={options}/> );
}
