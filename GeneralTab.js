import React, { useState, useEffect } from "react";
import "./GeneralTab.css";

const GeneralTab = () => {
  const [mode, setMode] = useState("system"); 
  const [alerts, setAlerts] = useState({
    severeWeather: true,
    dailyForecast: true,
    precipitation: true,
  });
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [launchLocationMode, setLaunchLocationMode] = useState("detect");
  const [defaultLocation, setDefaultLocation] = useState("New York, NY");

  const currentTempCelsius = 25;

  const convertTemperature = (tempC) => {
    return temperatureUnit === "celsius"
      ? `${tempC}°C`
      : `${Math.round((tempC * 9) / 5 + 32)}°F`;
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    const body = document.body;
    body.classList.remove("light-mode", "dark-mode");

    if (mode === "dark") body.classList.add("dark-mode");
    else if (mode === "light") body.classList.add("light-mode");
    else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      body.classList.add(systemPrefersDark ? "dark-mode" : "light-mode");
    }
  }, [mode]);

  return (
    <div className="settings-container">
      {}
      <div className="section">
        <h3>Options</h3>
        <label>
          Edition:
          <select defaultValue="US">
            <option value="US">United States (English)</option>
          </select>
        </label>

        <div className="mode-options">
          <p>Choose a mode:</p>
          <label>
            <input
              type="radio"
              name="mode"
              checked={mode === "light"}
              onChange={() => setMode("light")}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              checked={mode === "dark"}
              onChange={() => setMode("dark")}
            />
            Dark
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              checked={mode === "system"}
              onChange={() => setMode("system")}
            />
            Windows default
          </label>
        </div>

        <a href="#">Windows color settings</a>
      </div>

      {}
      <div className="section">
        <h3>Notifications</h3>
        {Object.entries(alerts).map(([key, value]) => (
          <div key={key}>
            <label>
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  setAlerts((prev) => ({ ...prev, [key]: !prev[key] }))
                }
              />
              {key === "severeWeather"
                ? "Severe weather alerts"
                : key === "dailyForecast"
                ? "Daily forecast"
                : "Precipitation alerts"}
            </label>
            <p className="description">
              {key === "severeWeather"
                ? "Updates about storms and other severe weather"
                : key === "dailyForecast"
                ? "Weather details for today and tomorrow"
                : "Notifications of upcoming precipitation"}
            </p>
          </div>
        ))}
      </div>

      {}
      <div className="section">
        <h3>Show temperature in:</h3>
        <label>
          <input
            type="radio"
            name="temp"
            checked={temperatureUnit === "fahrenheit"}
            onChange={() => setTemperatureUnit("fahrenheit")}
          />
          Fahrenheit
        </label>
        <label>
          <input
            type="radio"
            name="temp"
            checked={temperatureUnit === "celsius"}
            onChange={() => setTemperatureUnit("celsius")}
          />
          Celsius
        </label>
      </div>

      {}
      <div className="section">
        <h3>Launch Location</h3>
        <label>
          <input
            type="radio"
            name="launchLocation"
            value="detect"
            checked={launchLocationMode === "detect"}
            onChange={() => setLaunchLocationMode("detect")}
          />
          Always detect my location
        </label>
        <label>
          <input
            type="radio"
            name="launchLocation"
            value="default"
            checked={launchLocationMode === "default"}
            onChange={() => setLaunchLocationMode("default")}
          />
          Use default location
        </label>

        {launchLocationMode === "default" && (
          <div className="default-location-input">
            <label>
              Default Location:
              <input
                type="text"
                value={defaultLocation}
                onChange={(e) => setDefaultLocation(e.target.value)}
                placeholder="Enter a city or ZIP"
              />
            </label>
          </div>
        )}
      </div>

      {}
      <div className="section">
        <h3>Example Output</h3>
        <p>
          Current temperature:{" "}
          <strong>{convertTemperature(currentTempCelsius)}</strong>
        </p>
        <p>
          Launch Location Mode:{" "}
          <strong>
            {launchLocationMode === "detect"
              ? "Auto Detect"
              : `Using "${defaultLocation}"`}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default GeneralTab;

