import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Monthly.css";

export default function Monthly() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(1);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const generateMonthlyData = () => {
    const year = new Date().getFullYear();
    const data = {};
    months.forEach((_, monthIndex) => {
      const days = getDaysInMonth(monthIndex, year);
      data[monthIndex] = Array.from({ length: days }, (_, i) => ({
        date: i + 1,
        temperature: +(20 + Math.random() * 10).toFixed(1),
        humidity: +(50 + Math.random() * 30).toFixed(0),
        precipitation: +(Math.random() * 10).toFixed(1),
        wind: +(5 + Math.random() * 15).toFixed(1),
        visibility: +(5 + Math.random() * 5).toFixed(1),
        pressure: +(1000 + Math.random() * 50).toFixed(0),
      }));
    });
    return data;
  };

  const monthlyData = useMemo(() => generateMonthlyData(), []);
  const selectedMonthData = monthlyData[selectedMonth] || [];
  const selectedDayData =
    selectedMonthData.find((d) => d.date === selectedDate) || selectedMonthData[0];

  return (
    <div className="monthly-container" style={{ display: "flex" }}>
      {}
      <aside className="date-sidebar" style={{ marginRight: 24 }}>
        {selectedMonthData.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDate(day.date)}
            className={`date-btn ${day.date === selectedDate ? "active" : ""}`}
          >
            {day.date}
          </button>
        ))}
      </aside>

      {}
      <div style={{ flex: 1 }}>
        {}
        <nav className="month-navbar">
          {months.map((month, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedMonth(idx);
                setSelectedDate(1);
              }}
              className={`month-btn ${idx === selectedMonth ? "active" : ""}`}
            >
              {month.slice(0, 3)}
            </button>
          ))}
        </nav>

        {}
        <div className="graph-section">
          <h3 className="graph-title">
            Temperature Trend — {months[selectedMonth]}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={selectedMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit="°C" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ff7300"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {}
        {selectedDayData && (
          <div className="weather-box-grid">
            <div className="weather-box">
              <h4>🌡️ Temp</h4>
              <p>{selectedDayData.temperature}°C</p>
            </div>
            <div className="weather-box">
              <h4>💧 Humidity</h4>
              <p>{selectedDayData.humidity}%</p>
            </div>
            <div className="weather-box">
              <h4>☔ Precipitation</h4>
              <p>{selectedDayData.precipitation} mm</p>
            </div>
            <div className="weather-box">
              <h4>🌬️ Wind</h4>
              <p>{selectedDayData.wind} km/h</p>
            </div>
            <div className="weather-box">
              <h4>👁️ Visibility</h4>
              <p>{selectedDayData.visibility} km</p>
            </div>
            <div className="weather-box">
              <h4>🌫️ Pressure</h4>
              <p>{selectedDayData.pressure} hPa</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
