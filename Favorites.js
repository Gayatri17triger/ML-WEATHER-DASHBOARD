import React, { useState, useEffect } from "react";
import "./favorite.css"; 

export default function Favorite() {
  const [launchLocation, setLaunchLocation] = useState("Launch Location:");
  const [favorites, setFavorites] = useState([]); 
  const [weatherData, setWeatherData] = useState({});

  const API_KEY = "7b518be2c8fe87bcc6582681479ec3dd";

  const fetchWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    if (data.main) {
      return {
        temp: data.main.temp,
        humidity: data.main.humidity,
      };
    }
    return { temp: 0, humidity: 0 }; 
  };

  useEffect(() => {
   
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    const loadWeatherData = async () => {
      const weatherInfo = {};
      for (const city of savedFavorites) {
        const data = await fetchWeather(city);
        weatherInfo[city] = data;
      }
      setWeatherData(weatherInfo);
    };

    loadWeatherData();
  }, []); 

  useEffect(() => {
    
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]); 

  const handleAddFavorite = async () => {
    const newFav = prompt("Enter a new favorite place:");
    if (newFav && !favorites.includes(newFav)) {
     
      setFavorites((prevFavorites) => {
        const updatedFavorites = [...prevFavorites, newFav];
        return updatedFavorites;
      });
      const newWeatherData = await fetchWeather(newFav);
      setWeatherData((prevData) => ({
        ...prevData,
        [newFav]: newWeatherData,
      }));
    }
  };

  const handleRemoveFavorite = (city) => {
    if (window.confirm(`Are you sure you want to remove ${city} from favorites?`)) {
      setFavorites((prev) => prev.filter((f) => f !== city));
      
      setWeatherData((prev) => {
        const updatedWeatherData = { ...prev };
        delete updatedWeatherData[city];
        return updatedWeatherData;
      });
    }
  };


  const handleLaunchLocationChange = (city) => {
    setLaunchLocation(city);
  };

  return (
    <div className="fav-container">
      <h2 className="fav-header">FAVORITE PLACES </h2>

      {}
      <div className="fav-launch-box">
        <h3>🚀 Current Favorite</h3>
        <p>{launchLocation}</p>
      </div>

      {}
      <div className="fav-grid">
        {favorites.map((place, index) => (
          <div
            key={index}
            className="fav-box"
            onClick={() => handleLaunchLocationChange(place)} 
          >
            <h4>{place}</h4>
            {}
            {weatherData[place] ? (
              <>
                <p>🌡 {weatherData[place].temp}°C</p>
                <p>💧 {weatherData[place].humidity}%</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
            {}
            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation(); 
                handleRemoveFavorite(place);
              }}
            >
              🗑️
            </button>
          </div>
        ))}

        {}
        <div className="fav-box fav-add-box" onClick={handleAddFavorite}>
          <span className="fav-plus">+</span>
        </div>
      </div>
    </div>
  );
}
