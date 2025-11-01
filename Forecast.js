import React, { useState, useEffect } from "react";
import "./forecast.css";
import axios from "axios";

export default function Forecast() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [mode, setMode] = useState("system");

  const API_KEY = "7b518be2c8fe87bcc6582681479ec3dd";

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeatherByCoords(28.6139, 77.209)
      );
    }
  }, []);

  const fetchWeatherByCityOrState = async () => {
    if (!search.trim()) return;
    try {
      const weatherRes = await axios.get(`http://localhost:5000/weather?city=${search}`);
      const data = weatherRes.data;
      data.locationName = search;
      setWeather(data);
      setHasSearched(true);
    } catch (error) {
      alert("Unable to fetch weather. Please check the name and try again.");
    }
  };

  useEffect(() => {
    if (document.body.classList.contains("dark-mode")) setMode("dark");
    else if (document.body.classList.contains("light-mode")) setMode("light");
    else setMode("system");
  }, []);

  const bgColor = mode === "dark" ? "#1e1e1e" : "#f0f4f8";
  const cardBg = mode === "dark" ? "#2c2c2c" : "#f9fbff";
  const textColor = mode === "dark" ? "#fff" : "#000";
  const subTextColor = mode === "dark" ? "#ccc" : "#555";

  return (
    <div style={{ minHeight: "100vh", background: bgColor, color: textColor }}>
      <div style={{ padding: "20px" }}>

        <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city or state..."
            style={{
              width: "280px",
              padding: "10px",
              borderRadius: "6px",
              border: `1px solid ${mode === "dark" ? "#555" : "#ccc"}`,
              background: mode === "dark" ? "#333" : "#fff",
              color: textColor,
            }}
            onKeyDown={(e) => e.key === "Enter" && fetchWeatherByCityOrState()}
          />

          <button
            onClick={fetchWeatherByCityOrState}
            className="btn btn-blue"
          >
            Search
          </button>
        </div>

        {weather && (
          <div
            style={{
              padding: "30px",
              borderRadius: "14px",
              background: cardBg,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            {!hasSearched && <h2>Forecast</h2>}

            <h2 style={{ fontSize: "26px" }}>{weather.locationName || weather.name}</h2>
            <h3 style={{ fontSize: "22px" }}>{Math.round(weather.main.temp)}°C</h3>
            <p style={{ color: subTextColor }}>{weather.weather[0].description}</p>

            {}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginTop: "25px",
              }}
            >
              {[
                { icon: "🌡", label: "Temperature", value: `${weather.main.temp}°C`, className: "temp-box" },
                { icon: "💧", label: "Humidity", value: `${weather.main.humidity}%`, className: "humidity-box" },
                { icon: "🌬", label: "Wind", value: `${weather.wind.speed} m/s`, className: "wind-box" },
                { icon: "👁️", label: "Visibility", value: `${weather.visibility / 1000} km`, className: "visibility-box" },
                { icon: "🌀", label: "Pressure", value: `${weather.main.pressure} hPa`, className: "pressure-box" },
                { icon: "☀️", label: "UV Index", value: "Need OneCall API", className: "uv-box" },
              ].map((item, idx) => (
                <div key={idx} className={`stat-box ${item.className}`}>
                  <h4 style={{ fontSize: "18px", marginBottom: "5px" }}>{item.icon} {item.label}</h4>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
