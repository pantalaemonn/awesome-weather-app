"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { presetLocations } from "@/utils/locations";
import Image from "next/image";

export default function DropDown({
  handleWeatherData,
  handleLocationChange,
  onImageClick,
  onButtonClick,
}) {
  // Initialise selected key to the first location
  const locationKeys = Object.keys(presetLocations);
  const defaultKey = locationKeys[0];
  const [selectedKey, setSelectedKey] = useState(defaultKey);

  // Check that response status is between 200 and 299, otherwise throw error
  const responseStatusCheck = (responseObject) => {
    console.log("responseStatusCheck called with:", responseObject);
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject;
    }

    throw new Error(responseObject.statusText);
  };

  // Fetch weather data from API
  const fetchWeather = async (location) => {
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max&current=temperature_2m`
      );

      responseStatusCheck(res);

      handleWeatherData(res.data);

      handleLocationChange(`${location.name}`);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      console.log("error:", error.message);
    }
  };

  // When the dropdown changes
  const handleLocationSelect = (e) => {
    setSelectedKey(e.target.value);
  };

  // Loads the default location
  useEffect(() => {
    const location = presetLocations[selectedKey];

    if (location) fetchWeather(location);
  }, [selectedKey]);

  return (
    <div className="text-gray-600 text-right pb-4">
      <select
        value={selectedKey}
        onChange={handleLocationSelect}
        className="max-w-[300px] border border-gray-700 rounded-md bg-white text-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        {Object.keys(presetLocations).map((key) => {
          const location = presetLocations[key];
          return (
            <option value={key} key={key}>
              {location.name}
            </option>
          );
        })}
      </select>
      <Image
        src="/profile.png"
        alt="Profile"
        width={34}
        height={35}
        className="inline pl-2 cursor-pointer"
        onClick={onImageClick}
      />
    </div>
  );
}
