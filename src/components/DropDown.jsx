"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { presetLocations } from "@/utils/locations";

export default function SearchBar({ handleWeatherData, handleLocationChange }) {
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
    }
    
    // Fetch weather data from API
    const fetchWeather = async (location) => {
        try {
            const res = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max`
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
        <div className="text-white">
            <select value={selectedKey} onChange={handleLocationSelect} className="focus:outline-none">
                {Object.keys(presetLocations).map((key) => {
                    const location = presetLocations[key];
                    return (
                    <option value={key} key={key}>{location.name}</option>
                    )
                })}
            </select>
        </div>
    );
}
