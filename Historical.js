import React, { useState } from "react";
import './Historical.css';
import { Line, Bar, Radar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadarController,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadarController,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const temperatureData = {
  labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  datasets: [
    {
      label: "Daily High (°C)",
      data: [8, 9, 12, 18, 25, 30, 33, 32, 30, 28, 22, 10],
      borderColor: "red",
      backgroundColor: "rgba(255,99,132,0.2)",
      tension: 0.3,
      fill: true,
    },
    {
      label: "Daily Low (°C)",
      data: [0, 2, 4, 8, 13, 17, 22, 23, 21, 17, 10, 3],
      borderColor: "blue",
      backgroundColor: "rgba(54, 162, 235,0.2)",
      tension: 0.3,
      fill: true,
    },
  ],
};

const precipitationData = {
  labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  datasets: [
    {
      label: "Precipitation (mm)",
      data: [50, 40, 45, 30, 20, 15, 10, 12, 20, 40, 55, 60],
      backgroundColor: "rgba(64, 168, 245, 0.7)",
      borderColor: "#40a8f5",
      borderWidth: 1,
    },
  ],
};

const windData = {
  labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  datasets: [
    {
      label: "Wind Speed (km/h)",
      data: [12, 13, 11, 14, 15, 12, 13, 14, 16, 10, 11, 13],
      backgroundColor: "rgba(255, 206, 86,0.5)",
      borderColor: "orange",
      borderWidth: 2,
      fill: true,
    },
  ],
};


const avgHumidity = 75; 
const humidityData = {
  labels: ["Humidity (%)", "Dry (%)"],
  datasets: [
    {
      label: "Humidity",
      data: [avgHumidity, 100 - avgHumidity],
      backgroundColor: [
        "rgba(75, 192, 192, 0.7)",
        "rgba(200, 200, 200, 0.3)"
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(200, 200, 200, 0.5)"
      ],
      borderWidth: 1,
    },
  ],
};

function Historical() {
  const [activeTab, setActiveTab] = useState("precipitation");

  let chart;
  let chartLabel;

  switch (activeTab) {
    case "temperature":
      chartLabel = "Temperature 🌡";
      chart = <Line data={temperatureData} />;
      break;
    case "wind":
      chartLabel = "Wind ❄️";
      chart = <Radar data={windData} />;
      break;
    case "humidity":
      chartLabel = "Humidity 🌧";
      chart = <Doughnut data={humidityData} />;
      break;
    case "precipitation":
    default:
      chartLabel = "Precipitation 🌧";
      chart = <Bar data={precipitationData} />;
      break;
  }

  return (
    <div className="weather-dashboard">
      <nav>
        <button
          className={activeTab === "temperature" ? "active" : ""}
          onClick={() => setActiveTab("temperature")}
        >
          Temperature
        </button>
        <button
          className={activeTab === "precipitation" ? "active" : ""}
          onClick={() => setActiveTab("precipitation")}
        >
          Precipitation
        </button>
        <button
          className={activeTab === "wind" ? "active" : ""}
          onClick={() => setActiveTab("wind")}
        >
          Wind
        </button>
        <button
          className={activeTab === "humidity" ? "active" : ""}
          onClick={() => setActiveTab("humidity")}
        >
          Humidity
        </button>
      </nav>
      <h2>{chartLabel} Chart (Last 12 Months)</h2>
      <div className="chart-panel">{chart}</div>
    </div>
  );
}

export default Historical;
