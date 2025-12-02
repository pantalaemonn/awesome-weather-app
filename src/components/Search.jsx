"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ handleWeatherData, handleLocationChange }) {
  const fetchWeather = async (lat, lon, name, country) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,wind_speed_10m_max,wind_gusts_10m_max,snowfall_sum&current=wind_speed_10m,snowfall,showers,rain,temperature_2m&wind_speed_unit=mph&timezone=auto`
    );
    const data = await res.json();
    console.log(data);
    handleWeatherData(data);
    handleLocationChange(`${name}, ${country}`);
  };

  // Search handler
  const handleSearch = async (query) => {
    console.log("handle search called");
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`
    );
    const data = await res.json();
    console.log(data);

    if (data.results && data.results.length > 0) {
      const { latitude, longitude, name, country } = data.results[0];
      fetchWeather(latitude, longitude, name, country);
    } else {
      alert("Location not found!");
    }
  };

  useEffect(() => {
    handleSearch("Sheffield");
  }, []);

  // Local state for the input field
  const [query, setQuery] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (query.trim() !== "") {
      handleSearch(query);
    }
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
}
