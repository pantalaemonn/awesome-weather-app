"use client";
import { weatherCodeToAdvice } from "@/utils/advice";
import { getWeatherDescription } from "@/utils/weatherCodes";

export default function VisitingAdvice({
  location,
  weatherCode,
  maxTemp,
  windSpeed,
  selectedDay,
  onBack
}) {
  const description = getWeatherDescription(weatherCode);
  const advice = weatherCodeToAdvice[weatherCode];

  return (
    <>
      <div className="content fade-in">
        <div className="visiting flex">
          <div className="fade-in flex flex-col justify-between w-full">
            <div className="text-gray-700">
              <h2 className="p-3 font-semibold text-3xl w-3/5">
                {selectedDay}
              </h2>

              <p className="pl-3 mb-2 w-3/5">
                <span className="font-semibold">Weather conditions:</span>{" "}
                {description || "Unknown conditions"}
              </p>

              {maxTemp !== undefined && (
                <p className="pl-3 mb-2 w-3/5">
                  <span className="font-semibold">Peak temperature:</span>{" "}
                  {maxTemp}°C
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
                <p className="w-3/5">{advice}</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="ml-4 mb-4 px-4 py-2 bg-emerald-500 text-white self-start rounded-sm"
            >
              Back to Weather
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
