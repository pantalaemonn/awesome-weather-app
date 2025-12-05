"use client";
import { weatherCodeToAdvice } from "@/utils/advice";
import { getWeatherDescription } from "@/utils/weatherCodes";

export default function VisitingAdvice({
  location,
  weatherCode,
  currentTemp,
  windSpeed,
}) {
  const description = getWeatherDescription(weatherCode);
  const advice = weatherCodeToAdvice[weatherCode];

  return (
    <>
      <div className="content fade-in">
        <div className="page-title">
          <h1>visiting advice</h1>
        </div>
        <div className="visiting">
          <div className="fade-in">
            <div className="text-gray-700">
              <h2 className="p-3 font-semibold text-2xl mb-2">
                Visiting advice for {location}
              </h2>

              <p className="pl-3 mb-2">
                <span className="font-semibold">Current conditions:</span>{" "}
                {description || "Unknown conditions"}
              </p>

              {currentTemp !== undefined && (
                <p className="pl-3 mb-2">
                  <span className="font-semibold">Current temperature:</span>{" "}
                  {currentTemp}°C
                </p>
              )}

              {windSpeed !== undefined && (
                <p className="pl-3 mb-4">
                  <span className="font-semibold">Wind:</span> {windSpeed} mph
                </p>
              )}

              <div className="mt-4 p-3 bg-emerald-600/40">
                <h3 className="text-xl font-semibold mb-2">
                  Hiker recommendations
                </h3>
                <p>{advice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
