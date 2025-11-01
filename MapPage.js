
import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OWM_API_KEY = "7b518be2c8fe87bcc6582681479ec3dd"; 

export default function MapPage() {
  const subLinks = [
    { label: "Air Quality", icon: " AIR QUALITY 🌬" },
    { label: "Clouds", icon: "CLOUDS ☁️" },
    { label: "Temperature", icon: "TEMPERATURE 🌡" },
    
  ];

  const [activeTab, setActiveTab] = useState("Temperature");

  const timelineDays = 5;
  const timeline = useMemo(() => {
    const arr = [];
    const now = new Date();
    for (let i = 0; i < timelineDays; i++) {
      const d = new Date(now.getTime() + i * 24 * 3600 * 1000);
      d.setUTCHours(12, 0, 0, 0);
      arr.push(d);
    }
    return arr;
  }, []);

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const celsiusStops = [-20, -10, 0, 10, 20, 30, 40];
  const [unit, setUnit] = useState("C"); 
  function cToF(c) {
    return Math.round((c * 9) / 5 + 32);
  }

  const [showWind, setShowWind] = useState(false);

  const [aqiValue] = useState(120); 

  function getAQIColor(aqi) {
    if (aqi <= 50) return "#00e400"; 
    if (aqi <= 100) return "#ffff00"; 
    if (aqi <= 150) return "#ff7e00"; 
    if (aqi <= 200) return "#ff0000"; 
    if (aqi <= 300) return "#99004c"; 
    return "#7e0023"; 
  }

  const selectedUnix = Math.floor(timeline[selectedDayIndex].getTime() / 1000);

  const tempTileUrl = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}&date=${selectedUnix}`;
  const aqiTileUrl = `https://tile.openweathermap.org/map/pm2_5/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`;
  const windTileUrl = `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`;
  
  const gradientCSS = `linear-gradient(to right, 
    #3f51b5 0%, #2196f3 16%, #00bcd4 33%, #4caf50 50%, #ffeb3b 66%, #f44336 83%, #b71c1c 100%)`;

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", minHeight: "100vh", background: "#fafafa" }}>
      {}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "10px 12px",
          borderBottom: "1px solid #e6e6e6",
          background: "#fff",
          overflowX: "auto",
        }}
      >
        {subLinks.map((s) => (
          <button
            key={s.label}
            onClick={() => setActiveTab(s.label)}
            title={s.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              borderRadius: 8,
              border: activeTab === s.label ? "2px solid #1976d2" : "1px solid transparent",
              background: activeTab === s.label ? "#e8f0ff" : "transparent",
              cursor: "pointer",
              fontWeight: activeTab === s.label ? 700 : 500,
              color: activeTab === s.label ? "#1976d2" : "#333",
              minWidth: 48,
              fontSize: 22,
            }}
          >
            {s.icon}
          </button>
        ))}
      </div>

      {}
      <div style={{ padding: 20 }}>
        {}
        {activeTab === "Temperature" && (
          <>
            <h2 style={{ marginTop: 0, marginBottom: 12 }}>🌡 Temperature</h2>
            <div
              style={{
                position: "relative",
                height: 520,
                width: "100%",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                background: "#eaeaea",
              }}
            >
              <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
                <TileLayer attribution="&copy; OSM" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <TileLayer attribution="&copy;" url={tempTileUrl} opacity={0.88} />
              </MapContainer>
            </div>

            {}
            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              {timeline.map((d, idx) => {
                const isActive = idx === selectedDayIndex;
                const label = idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : `+${idx}d`;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: isActive ? "2px solid #1976d2" : "1px solid #ddd",
                      background: isActive ? "#1976d2" : "#fff",
                      color: isActive ? "#fff" : "#333",
                      cursor: "pointer",
                      minWidth: 90,
                      fontWeight: 600,
                    }}
                  >
                    {label}
                    <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.9 }}>
                      {d.toLocaleDateString()}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {}
        {activeTab === "Air Quality" && (
          <>
            <h2 style={{ marginTop: 0, marginBottom: 12 }}>🌬 Air Quality</h2>
            <div
              style={{
                position: "relative",
                height: 520,
                width: "100%",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                background: "#eaeaea",
              }}
            >
              <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
                <TileLayer attribution="&copy; OSM" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <TileLayer attribution="&copy;" url={aqiTileUrl} opacity={0.9} />
                {showWind && <TileLayer attribution="&copy;" url={windTileUrl} opacity={0.65} />}
              </MapContainer>
            </div>

            {}
            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              {timeline.map((d, idx) => {
                const isActive = idx === selectedDayIndex;
                const label = idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : `+${idx}d`;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: isActive ? "2px solid #1976d2" : "1px solid #ddd",
                      background: isActive ? "#1976d2" : "#fff",
                      color: isActive ? "#fff" : "#333",
                      cursor: "pointer",
                      minWidth: 90,
                      fontWeight: 600,
                    }}
                  >
                    {label}
                    <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.9 }}>
                      {d.toLocaleDateString()}
                    </div>
                  </button>
                );
              })}
            </div>

            {}
            <div
              style={{
                position: "fixed",
                right: 20,
                bottom: 20,
                zIndex: 1400,
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "transparent",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 999,
                  padding: "8px 12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  minWidth: 360,
                }}
              >
                {}
                <div
                  style={{
                    width: 80,
                    height: 40,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    background: getAQIColor(aqiValue),
                    color: "#fff",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    fontSize: 14,
                  }}
                >
                  AQI {aqiValue}
                </div>

                {}
                <div style={{ flex: 1, padding: "6px 8px" }}>
                  {(() => {
                    const aqiBreakpoints = [0, 50, 100, 150, 200, 300, 500];
                    const gradient = aqiBreakpoints
                      .map((v, i) => `${getAQIColor(v)} ${(i / (aqiBreakpoints.length - 1)) * 100}%`)
                      .join(", ");
                    return (
                      <div
                        style={{
                          height: 18,
                          borderRadius: 10,
                          background: `linear-gradient(to right, ${gradient})`,
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {aqiBreakpoints.map((v, i) => {
                          const percent = (i / (aqiBreakpoints.length - 1)) * 100;
                          return (
                            <div
                              key={v}
                              style={{
                                position: "absolute",
                                left: `${percent}%`,
                                transform: "translateX(-50%)",
                                top: 20,
                                textAlign: "center",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <div
                                style={{
                                  width: 2,
                                  height: 8,
                                  background: getAQIColor(v),
                                  margin: "0 auto",
                                  borderRadius: 1,
                                }}
                              />
                              <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: "#222" }}>{v}</div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {}
                <button
                  onClick={() => setShowWind(!showWind)}
                  title="Toggle Wind Layer"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 999,
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: showWind ? "#1976d2" : "#fff",
                    color: showWind ? "#fff" : "#1976d2",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                >
                  💨
                </button>
              </div>
            </div>
          </>
        )}

        {}
        {activeTab === "Clouds" && (
          <>
            <h2 style={{ marginTop: 0, marginBottom: 12 }}>☁️ Clouds</h2>
            <div
              style={{
                position: "relative",
                height: 520,
                width: "100%",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                background: "#eaeaea",
              }}
            >
              <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
              {}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {}
              <TileLayer
                attribution="&copy; OpenWeather"
                url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`}
                opacity={0.85}
              />
            </MapContainer>
            </div>

            {}
            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              {timeline.map((d, idx) => {
                const isActive = idx === selectedDayIndex;
                const label = idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : `+${idx}d`;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: isActive ? "2px solid #1976d2" : "1px solid #ddd",
                      background: isActive ? "#1976d2" : "#fff",
                      color: isActive ? "#fff" : "#333",
                      cursor: "pointer",
                      minWidth: 90,
                      fontWeight: 600,
                    }}
                  >
                    {label}
                    <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.9 }}>
                      {d.toLocaleDateString()}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
         )}

        {}
        {activeTab !== "Temperature" && activeTab !== "Air Quality" && activeTab !== "Clouds" && (
          <div>
            <h2>
              {subLinks.find((s) => s.label === activeTab)?.icon} {activeTab}
            </h2>
            <p>{activeTab} content placeholder.</p>
          </div>
        )}
      </div>

      {}
      {activeTab === "Temperature" && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            zIndex: 1400,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "transparent",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 999,
              padding: "8px 12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 360,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                background: "#1976d2",
                color: "#fff",
                boxShadow: "0 4px 10px rgba(25,118,210,0.2)",
              }}
            >
              °{unit}
            </div>

            <div style={{ flex: 1, padding: "6px 8px" }}>
              <div
                style={{
                  height: 18,
                  borderRadius: 10,
                  background: gradientCSS,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {celsiusStops.map((c, i) => {
                  const percent = (i / (celsiusStops.length - 1)) * 100;
                  return (
                    <div
                      key={c}
                      style={{
                        position: "absolute",
                        left: `${percent}%`,
                        transform: "translateX(-50%)",
                        top: 20,
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div
                        style={{
                          width: 2,
                          height: 8,
                          background: "#fff",
                          margin: "0 auto",
                          borderRadius: 1,
                        }}
                      />
                      <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: "#222" }}>
                        {unit === "C" ? `${c}°` : `${cToF(c)}°`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              title={`Switch to °${unit === "C" ? "F" : "C"}`}
              style={{
                width: 46,
                height: 46,
                borderRadius: 999,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                cursor: "pointer",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: unit === "C" ? "rotate(0deg)" : "rotate(180deg)" }}
              >
                <path d="M8 5v14l11-7z" fill="#1976d2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
