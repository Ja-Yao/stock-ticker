import React, { useState, useEffect} from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function LineChart({ stock }) {
	const labels = stock.values.reverse().map((data) => data.datetime.split(" ")[1]);
	const price = stock.values.reverse().map((data) => data.close);

	const data = () => {
		return {
      labels: labels,
      datasets: [
        {
          label: "Price",
          data: price,
					backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 800);
            gradient.addColorStop(0, "rgba(25, 130, 252, 0.2)");
            gradient.addColorStop(0.6, "rgba(25, 130, 252, 0)");
            return gradient;
          },
          borderColor: "#2469f0",
          borderWidth: 2,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 8,
          tension: 0.5,
        },
      ],
    };
  };

	const options = {
    responsive: true,
    plugins: {
      legend: false, // Hide legend
    },
    scales: {
      y: {
				grid: {
					dispaly: false,
					drawBorder: false,
					drawOnChartArea: false,
					drawTicks: false
				},
        display: true, // Hide Y axis labels
      },
      x: {
				grid: {
					dispaly: false,
					drawBorder: false,
					drawOnChartArea: false,
					drawTicks: false
				},
				title: {
          display: true,
          text: 'Time'
        },
        display: false, // Hide X axis labels
      },
    },
  };

  return <Line data={data()} options={options} />;
}
