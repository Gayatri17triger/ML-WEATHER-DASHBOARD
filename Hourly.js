import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Hourly.css";

export default function Hourly() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("1 AM");

  const getDates = (days = 13) => {
    const today = new Date();
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
  };

  const weekDates = getDates(13);
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });

  const hourLabels = [
    ...Array.from({ length: 12 }, (_, i) => `${i + 1} AM`),
    ...Array.from({ length: 12 }, (_, i) => `${i + 1} PM`),
  ];

  const generateWeatherData = () => {
    const data = {};
    weekDates.forEach((date) => {
      const dateKey = date.toDateString();
      data[dateKey] = hourLabels.map((hour) => ({
        hour,
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

  const weatherData = generateWeatherData();

  const handleDateClick = (date) => setSelectedDate(date);
  const handleHourClick = (hour) => setSelectedHour(hour);

  const selectedDayData = weatherData[selectedDate.toDateString()] || [];
  const selectedIndex = selectedDayData.findIndex((h) => h.hour === selectedHour);
  const previousData = selectedDayData.slice(0, selectedIndex + 1);

  return (
    <div className="hourly-grid-container">
      {}
      <div className="graph-section">
        <h2 className="graph-title">
          Temperature Trend — {formatDate(selectedDate)}
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={selectedDayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" interval={2} />
            <YAxis unit="°C" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#007bff"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {}
      <div className="days-row">
        <div className="corner-cell"></div>
        {weekDates.map((date, idx) => (
          <button
            key={idx}
            onClick={() => handleDateClick(date)}
            className={`day-btn ${date.toDateString() === selectedDate.toDateString() ? "active" : ""}`}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>

      {}
      <div className="main-grid">
        {}
        <div className="hours-column">
          {hourLabels.map((hour) => (
            <button
              key={hour}
              onClick={() => handleHourClick(hour)}
              className={`hour-btn ${hour === selectedHour ? "active" : ""}`}
            >
              {hour}
            </button>
          ))}
        </div>

        {}
        <div className="content-area">
          <h2>
            {formatDate(selectedDate)} — {selectedHour}
          </h2>

          {selectedIndex >= 0 && (
            <div className="weather-box-grid">
              <div className="weather-box">
                <h4>🌡️ Temp</h4>
                <p>{selectedDayData[selectedIndex].temperature}°C</p>
              </div>
              <div className="weather-box">
                <h4>💧 Humidity</h4>
                <p>{selectedDayData[selectedIndex].humidity}%</p>
              </div>
              <div className="weather-box">
                <h4>☔ Precipitation</h4>
                <p>{selectedDayData[selectedIndex].precipitation} mm</p>
              </div>
              <div className="weather-box">
                <h4>🌬️ Wind</h4>
                <p>{selectedDayData[selectedIndex].wind} km/h</p>
              </div>
              <div className="weather-box">
                <h4>👁️ Visibility</h4>
                <p>{selectedDayData[selectedIndex].visibility} km</p>
              </div>
              <div className="weather-box">
                <h4>🌫️ Pressure</h4>
                <p>{selectedDayData[selectedIndex].pressure} hPa</p>
              </div>
            </div>
          )}

          {}
          {previousData.length > 1 && (
            <div className="previous-section">
              <h3>Earlier Data</h3>
              <div className="previous-grid">
                {previousData.slice(0, -1).map((h, idx) => (
                  <div className="previous-box" key={idx}>
                    <h4>{h.hour}</h4>
                    <p>{h.temperature}°C</p>
                    <p>{h.humidity}%</p>
                    <p>{h.wind} km/h</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
