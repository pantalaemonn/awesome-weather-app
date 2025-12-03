"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/Search";
import DayCard from "@/components/DayCard";
import { getWeatherDescription } from "@/utils/weatherCodes"

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Sheffield");

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [weekDay, setWeekDay] = useState("Today")

  const getWeekDayName = (dateString, index) => {
    if (index == 0) {
      return "Today";
    } else if (index == 1) {
      return "Tomorrow";
    }
  
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "long", // "Monday", "Tuesday", etc.
    });
  };

  const selectDay = (index) => {
    setCurrentDayIndex(index);
    const newWeekDay = getWeekDayName(weatherData.daily.time[index], index);
    setWeekDay(newWeekDay);
  }

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
            key={weatherData ? weatherData.daily.time[currentDayIndex] : "initial"}
            day={weatherData ? weatherData.daily.time[currentDayIndex] : ""}
            weekday={weekDay}
            maxTemp={weatherData ? weatherData.daily.temperature_2m_max[currentDayIndex] : ""}
            minTemp={weatherData ? weatherData.daily.temperature_2m_min[currentDayIndex] : ""}
            rain={weatherData ? weatherData.daily.rain_sum[currentDayIndex] : ""}
            windSpeed={weatherData ? weatherData.daily.wind_speed_10m_max[currentDayIndex] : ""}
            weatherDescription={getWeatherDescription(weatherData ? weatherData.daily.weather_code[currentDayIndex] : "")}
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
                  key={index}
                  className="bg-white border rounded shadow p-4 w-48 cursor-grab"
                  onClick={() => selectDay(index)}
                >
                  <strong>{getWeekDayName(day)}</strong> <br />
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
