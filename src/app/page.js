"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/Search";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Berlin");

  // Fetch weather data
  const fetchWeather = async (lat, lon, name, country) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,wind_speed_10m_max,wind_gusts_10m_max,snowfall_sum&current=wind_speed_10m,snowfall,showers,rain,temperature_2m&wind_speed_unit=mph&timezone=auto`
    );
    const data = await res.json();
    setWeatherData(data);
    setLocation(`${name}, ${country}`);
  };

  // Search handler passed to Search component
  const handleSearch = async (query) => {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const { latitude, longitude, name, country } = data.results[0];
      fetchWeather(latitude, longitude, name, country);
    } else {
      alert("Location not found!");
    }
  };

  // Load default location on mount
  useEffect(() => {
    handleSearch("Sheffield");
  }, []);

  return (
    <div className="site-container">
      <div className="search-container">
        <div className="search">
          <SearchBar onSearch={handleSearch} />{" "}
        </div>
      </div>
      <div className="content-container">
        <div className="content">
          <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
          <h2 className="text-xl mb-4">{location}</h2>
          {!weatherData ? (
            <p>Loading weather...</p>
          ) : (
            <ul className="flex flex-wrap gap-4">
              {weatherData.daily.time.map((day, index) => (
                <li
                  key={day}
                  className="bg-white border rounded shadow p-4 w-48"
                >
                  <strong>{day}</strong> <br />
                  Max Temp: {weatherData.daily.temperature_2m_max[index]}°C{" "}
                  <br />
                  Min Temp: {weatherData.daily.temperature_2m_min[index]}°C{" "}
                  <br />
                  Rain: {weatherData.daily.rain_sum[index]} mm <br />
                  Wind: {weatherData.daily.wind_speed_10m_max[index]} mph
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
