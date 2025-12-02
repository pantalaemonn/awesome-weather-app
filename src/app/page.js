"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/Search";
import DayCard from "@/components/DayCard";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Sheffield");

  return (
    <div className="site-container">
      <div className="search-container">
        <div className="search">
          <h2 className="text-4xl font-bold text-white mb-4">
            Search for a location
          </h2>
          <SearchBar
            handleWeatherData={(data) => setWeatherData(data)}
            handleLocationChange={(data) => setLocation(data)}
          />
          <h2 className="text-xl text-white mb-4">{location}</h2>
          <DayCard
            day={weatherData ? weatherData.daily.time[0] : ""}
            maxTemp={weatherData ? weatherData.daily.temperature_2m_max[0] : ""}
            minTemp={weatherData ? weatherData.daily.temperature_2m_min[0] : ""}
          />
        </div>
      </div>
      <div className="content-container">
        <div className="content">
          {!weatherData ? (
            <p>Loading weather...</p>
          ) : (
            <ul className="flex flex-wrap gap-2 w-[900px] ">
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
