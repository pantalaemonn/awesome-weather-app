"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ handleWeatherData, handleLocationChange }) {
    const responseStatusCheck = (responseObject) => {
        console.log("responseStatusCheck called with:", responseObject);
        if (responseObject.status >= 200 && responseObject.status < 300) {
            return responseObject;
        }

        throw new Error(responseObject.statusText);
    }
    
  const fetchWeather = async (lat, lon, name, country) => {
    try {
        const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max`
        );
        responseStatusCheck(res);
        handleWeatherData(res.data);
        handleLocationChange(`${name}, ${country}`);
    
    } catch (error) {
        console.error("Error fetching weather data:", error);
        console.log("error:", error.message);
    }
  };

  // Search handler
  const handleSearch = async (query) => {
    try {
        const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`
        );

        responseStatusCheck(res);

        if (res.data.results && res.data.results.length > 0) {
        const { latitude, longitude, name, country } = res.data.results[0];
        fetchWeather(latitude, longitude, name, country);
        } else {
        alert("Location not found!");
        }

    } catch (error) {
        console.error("Error fetching location data:", error);
        console.log("error:", error.message);
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
