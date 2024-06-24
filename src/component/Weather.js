import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css'; 

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); // error handling

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9dcc1679b219ac034c525cd30a809d9f`
      );
      setWeatherData(response.data);
      setError(null); // Reset error 
    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data. Please try again.'); // Set error message
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>} 
      {weatherData ? (
        <div className="info">
          <h2>{weatherData.name}</h2>
          <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
          <p className="description">Description: {weatherData.weather[0].description}</p>
          <p className="Feels">Feels like: {weatherData.main.feels_like}°C</p>
          <p className="Humidity">Humidity: {weatherData.main.humidity}%</p>
          <p className="Pressure">Pressure: {weatherData.main.pressure}</p>
          <p className="Wind">Wind Speed: {weatherData.wind.speed}m/s</p>
        </div>
      ) : (
        <p className="loading">Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
