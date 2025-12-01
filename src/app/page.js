"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // State to hold weather data
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      // API call with our parameters
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,wind_speed_10m_max,wind_gusts_10m_max,snowfall_sum&current=wind_speed_10m,snowfall,showers,rain,temperature_2m&wind_speed_unit=mph&timezone=auto"
      );

      // Convert the response into JSON format
      const data = await res.json();

      // Save the JSON data into our state so we can use it in the UI
      setWeatherData(data);
    };

    fetchWeather();
  }, []);

  if (!weatherData) return <p>Loading weather...</p>;

  return (
    <div className="container">
      <div className="card">
        <h1>7-Day Weather Forecast</h1>
        <ul>
          {weatherData.daily.time.map((day, index) => (
            <li key={day}>
              <strong>{day}</strong> <br />
              Max Temp: {weatherData.daily.temperature_2m_max[index]}°C <br />
              Min Temp: {weatherData.daily.temperature_2m_min[index]}°C <br />
              Rain: {weatherData.daily.rain_sum[index]} mm <br />
              Showers: {weatherData.daily.showers_sum[index]} mm <br />
              Wind Speed: {weatherData.daily.wind_speed_10m_max[index]} mph{" "}
              <br />
              Gusts: {weatherData.daily.wind_gusts_10m_max[index]} mph <br />
              Snowfall: {weatherData.daily.snowfall_sum[index]} cm
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
