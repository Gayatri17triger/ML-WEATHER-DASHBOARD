import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Forecast from "./Forecast";
import MapPage from "./MapPage";
import Hourly from "./Hourly";
import Historical from "./Historical";
import Favorites from "./Favorites";
import Settings from "./Settings";
import Monthly from "./Monthly"; 

export default function App() {
  const [city, setCity] = useState("");

  return (
    <Router>
      {}
      <Navbar setCity={setCity} />

      {}
      <div style={{ marginTop: "60px", marginLeft: "70px", padding: "20px" }}>
        <Routes>
          <Route path="/forecast" element={<Forecast city={city} />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/hourly" element={<Hourly />} />
          <Route path="/monthly" element={<Monthly />} /> {}
          <Route path="/historical" element={<Historical />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />

          {}
          <Route path="/" element={<Forecast city={city} />} />
        </Routes>
      </div>
    </Router>
  );
}
