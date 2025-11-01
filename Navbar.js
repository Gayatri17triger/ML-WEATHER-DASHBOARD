import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WiDaySunny, WiTime4 } from "react-icons/wi";
import { FaMapMarkedAlt, FaRegCalendarAlt, FaStar, FaClock, FaBars, FaCog } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const iconSize = 22;

  const links = [
    { to: "/forecast", label: "Forecast", icon: <WiDaySunny /> },
    { to: "/map", label: "Maps", icon: <FaMapMarkedAlt /> },
    { to: "/hourly", label: "Hourly Forecast", icon: <WiTime4 /> },
    { to: "/monthly", label: "Monthly Forecast", icon: <FaRegCalendarAlt /> },
    { to: "/historical", label: "Historical Weather", icon: <FaClock /> },
    { to: "/favorites", label: "Favorites", icon: <FaStar /> },
  ];

  const bottomLinks = [
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  const currentLink = [...links, ...bottomLinks].find(
    link => link.to === location.pathname
  );
  const currentTitle = currentLink ? currentLink.label : "Forecast";

  return (
    <>
      {}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #ccc",
        zIndex: 1000,
      }}>
        <FaBars 
          size={24} 
          style={{ cursor: "pointer", marginRight: "16px" }} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <h2 style={{ margin: 0 }}>{currentTitle}</h2>
      </div>

      {}
      <div style={{
        position: "fixed",
        top: "60px",
        left: 0,
        width: sidebarOpen ? "220px" : "60px",
        height: "calc(100% - 60px)",
        background: "#f7f9fb",
        borderRight: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", 
        transition: "width 0.3s",
        overflow: "hidden"
      }}>
        {}
        <div>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                textDecoration: "none",
                color: location.pathname === link.to ? "#1e88e5" : "#333",
                fontWeight: location.pathname === link.to ? "bold" : "normal",
                marginBottom: "4px",
                borderRadius: "6px",
                backgroundColor: location.pathname === link.to ? "#e3f2fd" : "transparent",
              }}
            >
              {React.cloneElement(link.icon, { size: iconSize })}
              {sidebarOpen && <span style={{ marginLeft: "12px" }}>{link.label}</span>}
            </Link>
          ))}
        </div>

        {}
        <div style={{ flexShrink: 0 }}>
          {bottomLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                textDecoration: "none",
                color: location.pathname === link.to ? "#1e88e5" : "#333",
                fontWeight: location.pathname === link.to ? "bold" : "normal",
                borderRadius: "6px",
                backgroundColor: location.pathname === link.to ? "#e3f2fd" : "transparent",
              }}
            >
              {React.cloneElement(link.icon, { size: iconSize })}
              {sidebarOpen && <span style={{ marginLeft: "12px" }}>{link.label}</span>}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

